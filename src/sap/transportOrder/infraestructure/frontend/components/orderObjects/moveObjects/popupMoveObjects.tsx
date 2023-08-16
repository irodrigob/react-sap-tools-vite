import { FC, useCallback, useEffect, useState } from "react";
import { Dialog, ValueState } from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";
import FooterDialog from "shared/frontend/components/footerDialog";
import MoveObjectsContainer from "./moveObjectsContainer";
import { OrderObjectsKey } from "sap/transportOrder/infraestructure/types/transport";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";
import useOrderObjects from "sap/transportOrder/infraestructure/frontend/hooks/useOrderObjects";

interface Props {
  objectsSelected: OrderObjectsKey;
  open: boolean;
  onClose: () => void;
}
const PopupMoveObjects: FC<Props> = (props: Props) => {
  const { objectsSelected, open: openMoveObjects, onClose } = props;
  const { getI18nText } = useTranslations();
  const [orderValueState, setOrderValueState] = useState<ValueState>(
    ValueState.None
  );
  const [orderValueStateMessage, setOrderValueStateMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const { showMessage } = useMessages();
  const { processMoveOrderObjects } = useOrderObjects();

  const handlerSelectedOrder = useCallback(
    (order: string) => {
      setSelectedOrder(order);
      if (objectsSelected.findIndex((row) => row.order == order) == -1) {
        setOrderValueState(ValueState.None);
        setOrderValueStateMessage("");
      } else {
        setOrderValueState(ValueState.Error);
        setOrderValueStateMessage(
          getI18nText(
            "transportOrder.orderObjects.moveObjects.orderToSameOrdersFrom"
          )
        );
      }
    },
    [objectsSelected]
  );

  return (
    <>
      <Dialog
        open={openMoveObjects}
        headerText={getI18nText(
          "transportOrder.orderObjects.moveObjects.popup.title"
        )}
        resizable={true}
        draggable={true}
        style={{ width: "50%" }}
        footer={
          <FooterDialog
            textEndButton={getI18nText(
              "transportOrder.orderObjects.btnClosePopup"
            )}
            textStartButton={getI18nText(
              "transportOrder.orderObjects.moveObjects.popup.btnConfirm"
            )}
            onEndButton={() => {
              onClose();
            }}
            onStartButton={() => {
              if (selectedOrder == "") {
                setOrderValueState(ValueState.Error);
                setOrderValueStateMessage(
                  getI18nText("transportOrder.selectOrder.orderMandatory")
                );
              } else {
                if (orderValueState != ValueState.Error) {
                  processMoveOrderObjects(selectedOrder, objectsSelected);
                  onClose();
                } else {
                  showMessage(
                    getI18nText(
                      "transportOrder.orderObjects.moveObjects.stillErrors"
                    ),
                    MessageType.warning
                  );
                }
              }
            }}
          />
        }
      >
        <MoveObjectsContainer
          objectsSelected={objectsSelected}
          onSelectedOrder={handlerSelectedOrder}
          orderValueState={orderValueState}
          setOrderValueState={setOrderValueState}
          orderValueStateMessage={orderValueStateMessage}
          setOrderValueStateMessage={setOrderValueStateMessage}
        />
      </Dialog>
    </>
  );
};

export default PopupMoveObjects;
