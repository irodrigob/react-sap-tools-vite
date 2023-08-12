import { useState, useCallback } from "react";
import {
  FieldsOrdersTreeTable,
  FieldsTaskTreeTable,
} from "sap/transportOrder/infraestructure/types/transport";
import useTransportOrder from "./useTransportOrder";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { useTranslations } from "translations/i18nContext";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import useDataManager from "./useDataManager";
import { useAppSelector } from "shared/storage/useStore";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";
import { OrderObjectSelected } from "sap/transportOrder/infraestructure/types/transport";

export default function useCellActions() {
  const { changeDataOrder, releaseOrders } = useTransportOrder();
  const { showMessage, updateMessage, updateResultError } = useMessages();
  const { getI18nText, language } = useTranslations();
  const {
    updateDataModel,
    transferEditingRow2ModelData,
    resetValuesDataEditingRow,
    existErrorDataForUpdate,
    setEditingRow,
  } = useDataManager();
  const { rowDataForUpdate, orderObjects } = useAppSelector(
    (state) => state.SAPTransportOrder
  );
  const sapTransportOrderActions = new SAPTransportOrderActions();

  const changeUserOrder = useCallback(
    (orderData: FieldsOrdersTreeTable | FieldsTaskTreeTable, user: string) => {
      const orderDataToUpdate = { ...orderData, user: user };

      let toastID = showMessage(
        getI18nText("transportOrder.updateOrder.updateUserInprocess", {
          order: orderData.orderTask,
        }),
        MessageType.info
      );

      changeDataOrder(orderDataToUpdate).then((response) => {
        if (response.isSuccess) {
          // No hay respuesta al ser un PUT por ello si va todo bien saco un mensaje propio
          updateMessage(
            toastID,
            getI18nText("transportOrder.updateOrder.updateSuccess", {
              order: orderData.orderTask,
            }),
            MessageType.success
          );

          updateDataModel(orderDataToUpdate);
        } else {
          updateResultError(toastID, response.getErrorValue() as ErrorGraphql);
        }
      });
    },
    []
  );

  const saveEditingRow = useCallback(() => {
    if (!existErrorDataForUpdate()) {
      // Se transferire los datos de fila con los datos editables a una estructura de datos y se
      // graban los datos
      let newValues = transferEditingRow2ModelData();

      let toastID = showMessage(
        getI18nText("transportOrder.updateOrder.updateInProcess", {
          order: newValues.orderTask,
        }),
        MessageType.info
      );

      changeDataOrder(newValues).then((response) => {
        if (response.isSuccess) {
          // No hay respuesta al ser un PUT por ello si va todo bien saco un mensaje propio
          updateMessage(
            toastID,
            getI18nText("transportOrder.updateOrder.updateSuccess", {
              order: newValues.orderTask,
            }),
            MessageType.success
          );

          // La fila de actualización se resetea.
          resetValuesDataEditingRow();
          // Se marca que ya no se esta editando globalmente
          setEditingRow(false);

          // Se marca la fila como no editable. Nota Iván: No puede usar el método que existe porque depende de cuando se ejecute
          // se guarda a nivel global el dato anterior y no el nuevo. Por ello marcado la fila en este sitio y se actualiza el modelo entero
          newValues.row_editing = false;

          // Se actualiza el modelo
          updateDataModel(newValues);
        } else {
          updateResultError(toastID, response.getErrorValue() as ErrorGraphql);
        }
      });
    } else {
      showMessage(
        getI18nText("transportOrder.changeOrder.validations.rowWithErrors"),
        MessageType.warning
      );
    }
  }, [rowDataForUpdate]);

  /**
   * Gestiona la acción de liberar una orden/tarea
   * @param order | Orden
   */
  const handlerReleaseOrder = useCallback(
    (order: string) => () => {
      releaseOrders(Array({ order: order }));
    },
    []
  );

  /**
   * Gestiona la acción de liberar una orden/tarea
   * @param selectedOrder | Orden seleccionada
   */
  const handlerOrderObjects = useCallback(
    (selectedOrder: OrderObjectSelected) => () => {
      sapTransportOrderActions.setOrdersObjectsSelected([{ ...selectedOrder }]);
      sapTransportOrderActions.setShowOrderObjects(true);
    },
    [orderObjects]
  );

  return {
    changeUserOrder,
    saveEditingRow,
    handlerReleaseOrder,
    handlerOrderObjects,
  };
}
