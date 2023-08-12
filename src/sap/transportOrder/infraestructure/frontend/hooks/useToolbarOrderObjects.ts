import { useCallback } from "react";
import useOrderObjects from "sap/transportOrder/infraestructure/frontend/hooks/useOrderObjects";
import { OrderObjectsKey } from "sap/transportOrder/infraestructure/types/transport";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { useTranslations } from "translations/i18nContext";
export default function useToolbarOrderObjects(
  setOpenMoveObjects: (value: boolean) => void,
  setOpenDeleteObjects: (value: boolean) => void
) {
  const { checkOrderTypeMoveOrders, checkOrderEditable } = useOrderObjects();
  const sapTransportOrderActions = new SAPTransportOrderActions();
  const { showMessage } = useMessages();
  const { getI18nText } = useTranslations();

  /**
   * Gestiona la acción de mover los objetos seleccionados
   */
  const handlerToolbarMove = (objectsSelected: OrderObjectsKey) => () => {
    if (objectsSelected.length > 0) {
      if (checkOrderTypeMoveOrders(objectsSelected))
        if (checkOrderEditable(objectsSelected)) setOpenMoveObjects(true);
        else
          showMessage(
            getI18nText(
              "transportOrder.orderObjects.actions.objectsOrdersNoEditable"
            ),
            MessageType.warning
          );
      else
        showMessage(
          getI18nText(
            "transportOrder.orderObjects.actions.objectsDiffOrderTypes"
          ),
          MessageType.warning
        );
    } else {
      showMessage(
        getI18nText("transportOrder.orderObjects.actions.selectOneObject"),
        MessageType.warning
      );
    }
  };
  /**
   * Gestiona la acción de mover los objetos seleccionados
   */
  const handlerToolbarDelete = (objectsSelected: OrderObjectsKey) => () => {
    if (objectsSelected.length > 0)
      if (checkOrderEditable(objectsSelected)) setOpenDeleteObjects(true);
      else
        showMessage(
          getI18nText(
            "transportOrder.orderObjects.actions.objectsOrdersNoEditable"
          ),
          MessageType.warning
        );
    else
      showMessage(
        getI18nText("transportOrder.orderObjects.actions.selectOneObject"),
        MessageType.warning
      );
  };

  return { handlerToolbarMove, handlerToolbarDelete };
}
