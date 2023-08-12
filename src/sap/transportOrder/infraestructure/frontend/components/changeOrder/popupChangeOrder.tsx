import { FC, useState } from "react";
import {
  FieldsOrdersTreeTable,
  FieldsTaskTreeTable,
} from "sap/transportOrder/infraestructure/types/transport";
import {
  Dialog,
  Button,
  Bar,
  Form,
  FormItem,
  CheckBox,
} from "@ui5/webcomponents-react";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { useTranslations } from "translations/i18nContext";
import FooterDialog from "shared/frontend/components/footerDialog";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";

interface Props {
  orderData: FieldsOrdersTreeTable | FieldsTaskTreeTable;
  open: boolean;
  onCloseButton: () => void;
}

type FormValues = {
  description: string;
  user: string;
};

const PopupChangeOrder: FC<Props> = (props) => {
  const { orderData, open, onCloseButton } = props;
  const { getI18nText } = useTranslations();
  const [btnSaveDisabled, setBtnSaveDisabled] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const { showMessage } = useMessages();

  const onSubmitForm = (data: FormValues) => {
    setBtnSaveDisabled(true);
    showMessage(
      getI18nText("editSystem.saveInProcess", {
        newSystem: orderData.orderTask,
      }),
      MessageType.info
    );
  };

  return (
    <Dialog
      open={open}
      headerText={getI18nText("transportOrder.changeOrder.popup.title")}
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
    ></Dialog>
  );
};

export default PopupChangeOrder;
