import { useState, FC, ReactNode, useEffect } from "react";
import {
  Dialog,
  Form,
  FormItem,
  Text,
  FlexBox,
  Link,
} from "@ui5/webcomponents-react";
import TextField from "@mui/material/TextField";
import { useSession } from "auth/authProvider";
import { useForm, Controller } from "react-hook-form";
import { useTranslations } from "translations/i18nContext";
import FooterDialog from "shared/frontend/components/footerDialog";
import Encrypt from "shared/utils/encrypt/encrypt";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { useSystemData } from "systems/infraestructure/context/systemContext";
import TunnelController from "tunnelSystem/infraestructure/controller/tunnelController";
import TunnelConfiguration from "tunnelSystem/domain/entities/configuration";
import { responseTunnelConfigRepo } from "tunnelSystem/infraestructure/types/repository";

type FormValues = {
  authToken: string;
  apiToken: string;
};

interface Props {
  open: boolean;
  onCloseButton: () => void;
  children?: ReactNode;
}
const PopupTunnelConfiguration: FC<Props> = (props) => {
  const { onCloseButton, open } = props;
  const { getI18nText } = useTranslations();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<FormValues>();
  const { session } = useSession();
  const { tunnelConfiguration, setTunnelConfiguration } = useSystemData();
  const [btnSaveDisabled, setBtnSaveDisabled] = useState(false);
  const tunnelController = new TunnelController();
  const wathAuthToken = watch("authToken");
  const { showMessage } = useMessages();

  /*************************************
   * Funciones
   ************************************/
  const onSubmitForm = (data: FormValues) => {
    setBtnSaveDisabled(true);

    showMessage(
      getI18nText("tunneling.editConfiguration.saveInProcess"),
      MessageType.info
    );

    tunnelController
      .editConfiguration(
        new TunnelConfiguration(
          tunnelConfiguration._id,
          tunnelConfiguration.user != ""
            ? tunnelConfiguration.user
            : session.email,
          data.authToken != "" ? Encrypt.encryptText(data.authToken) : "",
          data.authToken != ""
            ? data.apiToken != ""
              ? Encrypt.encryptText(data.apiToken)
              : ""
            : "",

          "NGROK"
        )
      )
      .then((response: responseTunnelConfigRepo) => {
        setBtnSaveDisabled(false);
        if (response.isSuccess) {
          // Mensaje de sistema añadido
          showMessage(
            getI18nText("tunneling.editConfiguration.saveSuccess"),
            MessageType.success
          );

          setTunnelConfiguration(response.getValue() as TunnelConfiguration);

          // Se vuelve activar el botón de grabar
          setBtnSaveDisabled(false);

          // Reseteo los valores del form
          reset();

          // Cierre de la ventana
          onCloseButton();
        } else if (response.isFailure) {
          showMessage(
            getI18nText("editSystem.errorCallServiceNew", {
              errorService: (
                response.getErrorValue() as ErrorGraphql
              ).getError().singleMessage,
            }),
            MessageType.error
          );
        }
      });
  };

  /*************************************
   * Efectos
   ************************************/
  useEffect(() => {
    setValue("apiToken", tunnelConfiguration.apiToken);
    setValue("authToken", tunnelConfiguration.authToken);
  }, [tunnelConfiguration]);

  return (
    <Dialog
      open={open}
      headerText={getI18nText("tunneling.editConfiguration.title")}
      footer={
        <FooterDialog
          textStartButton={getI18nText("general.btnTxtSave")}
          textEndButton={getI18nText("general.btnTxtCancel")}
          onEndButton={() => {
            reset();
            onCloseButton();
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
              name="authToken"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value }
              }) => (
                <FlexBox direction="Column">
                  <TextField
                    label={getI18nText(
                      "tunneling.editConfiguration.labelAuthToken"
                    )}
                    variant="filled"
                    value={value}
                    onChange={onChange}
                    sx={{
                      width: "35em",
                      fontFamily: "var(--sapFontFamily)",
                      fontSize: "var(--sapFontSize)",
                    }}
                    type="password"
                  />
                  <Text style={{ marginTop: "1em" }}>
                    {getI18nText("tunneling.editConfiguration.helperAuthToken")}
                    <br />
                    {getI18nText(
                      "tunneling.editConfiguration.helperAuthToken2"
                    )}
                    <br />
                    <Link
                      href={getI18nText(
                        "tunneling.editConfiguration.urlAuthToken"
                      )}
                      target="_blank"
                    >
                      {getI18nText(
                        "tunneling.editConfiguration.helperAuthTokenNavigate"
                      )}
                    </Link>
                  </Text>
                </FlexBox>
              )}
            />
          }
        />
        {wathAuthToken && wathAuthToken.length > 0 && (
          <FormItem
            children={
              <Controller
                name="apiToken"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FlexBox direction="Column">
                    <TextField
                      style={{ marginTop: "1.5em" }}
                      label={getI18nText(
                        "tunneling.editConfiguration.labelApiToken"
                      )}
                      variant="filled"
                      required
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={
                        !!error
                          ? error.type === "validate"
                            ? getI18nText("general.fieldMandatory")
                            : error.message
                          : null
                      }
                      sx={{
                        width: "35em",
                        fontFamily: "var(--sapFontFamily)",
                        fontSize: "var(--sapFontSize)",
                      }}
                      type="password"
                    />
                    <Text style={{ marginTop: "1em" }}>
                      {getI18nText(
                        "tunneling.editConfiguration.helperApiToken"
                      )}
                      <br />
                      <Link
                        href={getI18nText(
                          "tunneling.editConfiguration.urlApiToken"
                        )}
                        target="_blank"
                      >
                        {getI18nText(
                          "tunneling.editConfiguration.helperApiTokenNavigate"
                        )}
                      </Link>
                    </Text>
                  </FlexBox>
                )}
                rules={{
                  validate: (value) => value !== "" && wathAuthToken != "",
                }}
              />
            }
          />
        )}
      </Form>
    </Dialog>
  );
};

export default PopupTunnelConfiguration;
