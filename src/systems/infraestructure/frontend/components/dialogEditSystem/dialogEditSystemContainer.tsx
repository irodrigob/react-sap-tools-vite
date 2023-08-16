import { useState, FC, useEffect, useCallback } from "react";
import {
  Dialog,
  Form,
  FormItem,
  CheckBox,
} from "@ui5/webcomponents-react";
import TextField from "@mui/material/TextField";
import { useSession } from "auth/authProvider";
import { useForm, Controller } from "react-hook-form";
import { useTranslations } from "translations/i18nContext";
import {
  responseNewSystemRepo,
  responseSystemRepo,
} from "systems/infraestructure/types/application";
import FooterDialog from "shared/frontend/components/footerDialog";
import SystemController from "systems/infraestructure/controller/systemController";
import SystemFormatters from "shared/utils/formatters";
import Encrypt from "shared/utils/encrypt/encrypt";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";
import type { newSystemDTO } from "systems/infraestructure/dto/systemDTO";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import System from "systems/domain/entities/system";
import useSystems from "systems/infraestructure/frontend/hooks/useSystems";
import { useSystemData } from "systems/infraestructure/context/systemContext";
import { useAppSelector } from "shared/storage/useStore";
import SystemActions from "systems/infraestructure/storage/systemActions";

type FormValues = {
  name: string;
  host: string;
  sap_user: string;
  sap_password: string;
  use_connection_tunnel: boolean;
  url_manual_tunnel: string;
};

const DialogEditSystem: FC = () => {
  const { getI18nText } = useTranslations();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<FormValues>();
  const { session } = useSession();
  const { addSystem, updateSystem } = useSystems();
  const [btnSaveDisabled, setBtnSaveDisabled] = useState(false);
  const systemController = new SystemController();
  const watchUseTunnelConnection = watch("use_connection_tunnel");
  const { tunnelConfiguration } = useSystemData();
  const { showMessage, updateMessage, updateResultError } = useMessages();
  const { openEditSystem, systemEdit, operationEdit } = useAppSelector(
    (state) => state.System
  );
  const systemActions = new SystemActions();

  const createSystem = (data: FormValues) => {
    let newSystem: newSystemDTO = {
      user: session.email,
      name: data.name,
      host: SystemFormatters.formatterHost(data.host),
      sap_user: data.sap_user,
      sap_password:
        data.sap_password != "" ? Encrypt.encryptText(data.sap_password) : "",
      use_connection_tunnel: data.use_connection_tunnel,
      url_manual_tunnel:
        data.use_connection_tunnel && tunnelConfiguration.authToken == ""
          ? SystemFormatters.formatterHost(data.url_manual_tunnel)
          : "",
    };
    let toastID = showMessage(
      getI18nText("editSystem.saveInProcess", {
        newSystem: data.name,
      }),
      MessageType.info, { autoClose: false, isLoading: true }
    );

    systemController
      .createNewSystem(newSystem)
      .then((response: responseNewSystemRepo) => {
        setBtnSaveDisabled(false);
        if (response.isSuccess) {
          addSystem(response.getValue() as System);
          // Mensaje de sistema añadido
          updateMessage(
            toastID,
            getI18nText("editSystem.saveSuccess", {
              newSystem: (response.getValue() as System).name,
            }),
            MessageType.success
          );
          // Reseteo los valores del form
          reset();

          // Cierre de la ventana
          closeDialog();
        } else if (response.isFailure) {
          updateResultError(
            toastID,
            response.getErrorValue() as ErrorGraphql
          );
        }
      });
  };

  const editSystem = (data: FormValues) => {
    let toastID = showMessage(
      getI18nText("editSystem.saveInProcess", {
        newSystem: data.name,
      }),
      MessageType.info, { autoClose: false, isLoading: true }
    );
    systemController
      .updateSystem(
        new System(
          systemEdit?._id as string,
          systemEdit?.user as string,
          data.name,
          SystemFormatters.formatterHost(data.host),
          data.sap_user,
          data.sap_password != (systemEdit?.sap_password as string)
            ? Encrypt.encryptText(data.sap_password)
            : data.sap_password,
          data.use_connection_tunnel,
          data.use_connection_tunnel && tunnelConfiguration.authToken == ""
            ? data.url_manual_tunnel
            : ""
        )
      )
      .then((response: responseSystemRepo) => {
        if (response.isSuccess) {
          let updatedSystem = response.getValue() as System;
          updateMessage(
            toastID,
            getI18nText("editSystem.saveSuccess", {
              newSystem: updatedSystem.name,
            }),
            MessageType.success
          );

          // Cierre de la ventana
          closeDialog();

          updateSystem(updatedSystem); // Actualización del modelo interno
        } else if (response.isFailure) {
          updateResultError(
            toastID,
            response.getErrorValue() as ErrorGraphql
          );
        }
      });
  };

  /*************************************
   * Funciones
   ************************************/
  const onSubmitForm = (data: FormValues) => {
    setBtnSaveDisabled(true);

    if (operationEdit == "Add") createSystem(data);
    else editSystem(data);
  };

  const closeDialog = useCallback(() => {
    systemActions.setOpenEditSystem(false);
    systemActions.setSystemEdit(null);
    setBtnSaveDisabled(false);
  }, []);

  /*************************************
   * Efectos
   ************************************/

  useEffect(() => {
    setValue(
      "host",
      operationEdit == "Add" ? "" : (systemEdit?.host as string)
    );
    setValue(
      "name",
      operationEdit == "Add" ? "" : (systemEdit?.name as string)
    );
    setValue(
      "sap_password",
      operationEdit == "Add" ? "" : (systemEdit?.sap_password as string)
    );
    setValue(
      "sap_user",
      operationEdit == "Add" ? "" : (systemEdit?.sap_user as string)
    );
    setValue(
      "use_connection_tunnel",
      operationEdit == "Add"
        ? false
        : (systemEdit?.use_connection_tunnel as boolean)
    );
  }, [systemEdit, operationEdit]);

  return (
    <Dialog
      open={openEditSystem}
      headerText={
        operationEdit == "Add"
          ? getI18nText("editSystem.titleAddSystem")
          : getI18nText("editSystem.titleEditSystem")
      }
      footer={
        <FooterDialog
          textStartButton={getI18nText("general.btnTxtSave")}
          textEndButton={getI18nText("general.btnTxtCancel")}
          onEndButton={() => {
            reset();
            closeDialog();
          }}
          onStartButton={handleSubmit(onSubmitForm)}
          disabledStartButton={btnSaveDisabled}
        />
      }
    >
      <Form columnsL={1} columnsM={1} columnsXL={1} columnsS={1}>
        <FormItem
          children={
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  label={getI18nText("systems.labelName")}
                  variant="filled"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  sx={{
                    width: "15em",
                    fontFamily: "var(--sapFontFamily)",
                    fontSize: "var(--sapFontSize)",
                  }}
                />
              )}
              rules={{ required: getI18nText("general.fieldMandatory") }}
            />
          }
        />
        <FormItem
          children={
            <Controller
              name="host"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  label={getI18nText("systems.labelHOST")}
                  variant="filled"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={
                    !!error
                      ? error.type === "validate"
                        ? getI18nText("editSystem.msgErrorHostInvalid")
                        : error.message
                      : null
                  }
                  sx={{ width: "30em" }}
                />
              )}
              rules={{
                required: getI18nText("general.fieldMandatory"),
                validate: (value) => {
                  return systemController.validateHost(value);
                },
              }}
            />
          }
        />

        <FormItem
          children={
            <Controller
              name="sap_user"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  label={getI18nText("systems.labelSAPUser")}
                  variant="filled"
                  value={value}
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    onChange(e);
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                  sx={{ width: "15em" }}
                />
              )}
              rules={{ required: getI18nText("general.fieldMandatory") }}
            />
          }
        />
        <FormItem
          children={
            <Controller
              name="sap_password"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  label={getI18nText("systems.labelSAPPassword")}
                  variant="filled"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  sx={{ width: "15em" }}
                  type="password"
                />
              )}
              rules={{ required: getI18nText("general.fieldMandatory") }}
            />
          }
        />
        <FormItem
          children={
            <Controller
              name="use_connection_tunnel"
              control={control}
              defaultValue={false}
              render={({
                field: { onChange, value },

              }) => (
                <CheckBox
                  text={getI18nText("systems.labelUseConnectionTunnel")}
                  checked={value}
                  onChange={(e) => {
                    onChange(e.target.checked);
                  }}
                />
              )}
            />
          }
        />
        {watchUseTunnelConnection && tunnelConfiguration.authToken == "" && (
          <FormItem
            children={
              <Controller
                name="url_manual_tunnel"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label={getI18nText("systems.labelURLManualTunnel")}
                    variant="filled"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={
                      !!error
                        ? error.type === "validate"
                          ? getI18nText("editSystem.msgErrorHostInvalid")
                          : error.message
                        : null
                    }
                    sx={{ width: "15em" }}
                  />
                )}
                rules={{
                  validate: (value) => {
                    return systemController.validateHost(value);
                  },
                }}
              />
            }
          />
        )}
      </Form>
    </Dialog>
  );
};

export default DialogEditSystem;
