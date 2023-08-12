import { FC, useEffect } from "react";
import { Dialog, Form, FormItem } from "@ui5/webcomponents-react";
import { FormControl, FormHelperText } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import FooterDialog from "shared/frontend/components/footerDialog";
import { useTranslations } from "translations/i18nContext";
import TextField from "@mui/material/TextField";
import { FormNewOrder } from "sap/transportOrder/infraestructure/frontend/components/popupNewOrder/newOrder";
import SelectUser from "./selectUser";
import SelectOrderType from "./selectOrderType";
import SystemController from "systems/infraestructure/controller/systemController";

interface Props {
  open: boolean;
  onCloseButton: () => void;
  onConfirmButton: (data: FormNewOrder) => void;
}
const PopupNewOrder: FC<Props> = (props: Props) => {
  const { open, onCloseButton, onConfirmButton } = props;
  const { getI18nText } = useTranslations();
  const { control, handleSubmit, reset, setValue } = useForm<FormNewOrder>();
  const systemController = new SystemController();
  const systemSelected = systemController.getSystemSelected();

  useEffect(() => {
    setValue("user", systemSelected.sap_user);
  }, [systemSelected]);

  /**
   * Efecto un poco guarrillo que cuando se cierre la ventana limpua los campos de descripción y tipo.
   * El campo de usuario deja el de conexión al sistema.
   * Lo hago porque la ventana se cierra cuando la orden se haya creado correctamente.
   */
  useEffect(() => {
    if (!open) {
      setValue("description", "");
      setValue("type", "");
      setValue("user", systemSelected.sap_user);
    }
  }, [open]);

  /*************************************
   * Funciones
   ************************************/
  const onSubmitForm = (data: FormNewOrder) => {
    reset();
    onConfirmButton(data);
  };

  return (
    <Dialog
      open={open}
      headerText={getI18nText("transportOrder.newOrder.popup.title")}
      footer={
        <FooterDialog
          textStartButton={getI18nText(
            "transportOrder.newOrder.popup.btnConfirm"
          )}
          textEndButton={getI18nText("general.btnTxtCancel")}
          onEndButton={() => {
            //reset();
            onCloseButton();
          }}
          onStartButton={handleSubmit(onSubmitForm)}
        />
      }
    >
      <Form columnsL={2} columnsM={2} columnsXL={2} columnsS={1}>
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
                    "transportOrder.newOrder.popup.lblOrderDesc"
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
          label={getI18nText("transportOrder.newOrder.popup.lblOrderUser")}
          children={
            <Controller
              name="user"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl error={error?.message ? true : false} size="small">
                  <SelectUser onChange={onChange} value={value} />
                  <FormHelperText>{error?.message as string}</FormHelperText>
                </FormControl>
              )}
              rules={{ required: getI18nText("general.fieldMandatory") }}
            />
          }
        />
        <FormItem
          label={getI18nText("transportOrder.newOrder.popup.lblOrderType")}
          children={
            <Controller
              name="type"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl error={error?.message ? true : false} size="small">
                  <SelectOrderType onChange={onChange} value={value} />
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

export default PopupNewOrder;
