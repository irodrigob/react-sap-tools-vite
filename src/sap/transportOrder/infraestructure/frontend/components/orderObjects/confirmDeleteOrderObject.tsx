import { FC } from "react";
import { MessageBox, MessageBoxActions } from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteOrderObject: FC<Props> = (props: Props) => {
  const { onClose, open, onConfirm } = props;
  const { getI18nText } = useTranslations();


  return (
    <MessageBox
      open={open}
      onClose={(event) => {
        if (event.detail.action == "OK") {
          onConfirm();
        }
        onClose();
      }}
      titleText={getI18nText(
        "transportOrder.orderObjects.deleteObjects.confirmDelete.title"
      )}
      emphasizedAction={MessageBoxActions.Cancel}
    >
      {getI18nText(
        "transportOrder.orderObjects.deleteObjects.confirmDelete.mainText"
      )}
    </MessageBox>
  );
};

export default ConfirmDeleteOrderObject;
