import { FC, useEffect } from "react";
import {
  Dialog,
  Form,
  FormItem,
  Text,
  Option,
  Select,
  ValueState,
} from "@ui5/webcomponents-react";
import { FormControl, FormHelperText } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { useTranslations } from "translations/i18nContext";
import FooterDialog from "shared/frontend/components/footerDialog";
import { FormTransportCopy } from "sap/transportOrder/infraestructure/frontend/components/popupTransCopy/transCopy";
import { useAppSelector } from "shared/storage/useStore";

interface Props {
  open: boolean;
  onCloseButton: () => void;
  onConfirmButton: (data: FormTransportCopy) => void;
}

const PopupTransCopy: FC<Props> = (props) => {
  const { control, handleSubmit, reset, setValue } =
    useForm<FormTransportCopy>();
  const { open, onCloseButton, onConfirmButton } = props;
  const {
    systemsTransportCopy,
    systemTransportCopy,
    descriptionTransportCopy,
  } = useAppSelector((state) => state.SAPTransportOrder);
  const { getI18nText } = useTranslations();

  /*************************************
   * Funciones
   ************************************/
  const onSubmitForm = (data: FormTransportCopy) => {
    onConfirmButton(data);
  };
  /*************************************
   * Efectos
   ************************************/
  /**
   * Como se ha renderizado el componente el defaultValue del controller no funciona. Por ello
   * cuando cambie la descripción lo pongo directamente en el formulario.
   */
  useEffect(() => {
    setValue("description", descriptionTransportCopy);
    setValue("system", systemTransportCopy);
  }, [descriptionTransportCopy, systemTransportCopy]);

  return (
    <Dialog
      open={open}
      headerText={getI18nText("transportOrder.transportCopy.popup.title")}
      footer={
        <FooterDialog
          textStartButton={getI18nText(
            "transportOrder.transportCopy.popup.btnConfirm"
          )}
          textEndButton={getI18nText("general.btnTxtCancel")}
          onEndButton={() => {
            reset();
            onCloseButton();
          }}
          onStartButton={handleSubmit(onSubmitForm)}
        />
      }
    >
      <Form columnsL={1} columnsM={1} columnsXL={1} columnsS={1}>
        <FormItem
          children={
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  label={getI18nText(
                    "transportOrder.transportCopy.popup.lblOrderDesc"
                  )}
                  variant="filled"
                  value={value}
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    onChange(e);
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                  sx={{ width: "15em", marginBottom: "1rem" }}
                />
              )}
              rules={{ required: getI18nText("general.fieldMandatory") }}
            />
          }
        />
        <FormItem
          label={getI18nText("transportOrder.transportCopy.popup.lblSystem")}
          children={
            <Controller
              name="system"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl error={error?.message ? true : false} size="small">
                  <Select
                    onChange={(e) => {
                      onChange(e.detail.selectedOption.dataset.id);
                    }}
                    required={true}
                    valueState={
                      error?.message ? ValueState.Error : ValueState.None
                    }
                    valueStateMessage={<Text></Text>}
                  >
                    {systemTransportCopy == "" && (
                      <Option
                        key="__DUMMY"
                        value={value}
                        selected={true}
                        style={{ fontWeight: "bold" }}
                      >
                        {getI18nText(
                          "transportOrder.transportCopy.popup.placeholderSelectSystem"
                        )}
                      </Option>
                    )}
                    {systemsTransportCopy.map((row) => {
                      return (
                        <Option
                          key={row.systemName}
                          data-id={row.systemName}
                          value={value}
                          selected={
                            row.systemName == systemTransportCopy ? true : false
                          }
                          style={{ fontWeight: "bold" }}
                        >
                          {row.systemName == ""
                            ? getI18nText(
                              "transportOrder.transportCopy.popup.placeholderSelectSystem"
                            )
                            : `${row.systemName} - ${row.systemDesc}`}
                        </Option>
                      );
                    })}
                  </Select>

                  <FormHelperText>{error?.message as string}</FormHelperText>
                </FormControl>
              )}
              rules={{ required: getI18nText("general.fieldMandatory") }}
            />
          }
        />
      </Form>
    </Dialog>
  );
};

export default PopupTransCopy;
