import { FC } from "react";
import { MessageBox, MessageBoxActions, Text } from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";
import useOrderObjects from "sap/transportOrder/infraestructure/frontend/hooks/useOrderObjects";
import { OrderObjectsKey } from "sap/transportOrder/infraestructure/types/transport";

interface Props {
  objectsSelected: OrderObjectsKey;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteOrderObject: FC<Props> = (props: Props) => {
  const { objectsSelected, onClose, open, onConfirm } = props;
  const { getI18nText, language } = useTranslations();
  const sapTransportOrderActions = new SAPTransportOrderActions();

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
