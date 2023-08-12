import { FC } from "react";
import { MessageBox, MessageBoxActions, Text } from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";
//
interface Props {
  open: boolean;
  onClose: (action: string) => void;
}
const ConfirmReleaseOrders: FC<Props> = (props) => {
  const { open, onClose } = props;
  const { getI18nText } = useTranslations();

  return (
    <MessageBox
      open={open}
      onClose={(event) => {
        onClose(event.detail.action);
      }}
      titleText={getI18nText("transportOrder.releaseOrders.popupConfirm.title")}
      emphasizedAction={MessageBoxActions.OK}
    >
      {getI18nText("transportOrder.releaseOrders.popupConfirm.mainText")}
    </MessageBox>
  );
};

export default ConfirmReleaseOrders;
