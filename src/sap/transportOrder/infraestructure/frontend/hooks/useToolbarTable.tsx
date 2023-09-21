import { useState, useMemo, useCallback } from "react";
import { Ui5CustomEvent, InputDomRef } from "@ui5/webcomponents-react";
import { useAppSelector } from "shared/storage/useStore";
import useTransportOrder from "sap/transportOrder/infraestructure/frontend/hooks/useTransportOrder";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";
import { FormTransportCopy } from "sap/transportOrder/infraestructure/frontend/components/popupTransCopy/transCopy";
import { FormNewOrder } from "sap/transportOrder/infraestructure/frontend/components/popupNewOrder/newOrder";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { useTranslations } from "translations/i18nContext";
import SAPTransportOrderController from "sap/transportOrder/infraestructure/controller/sapTransportOrderController";
import NewOrder from "sap/transportOrder/domain/entities/newOrder";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import useDataManager from "./useDataManager";
import { userOrdersDTO } from "sap/transportOrder/infraestructure/dto/transportOrderDTO";
import {
  FieldsOrdersTreeTable,
  FieldsTaskTreeTable,
} from "sap/transportOrder/infraestructure/types/transport";

export default function useToolbarTable() {
  const [openConfirmeRelease, setOpenConfirmeRelease] = useState(false);
  const {
    doTransportCopy,
    releaseOrders,
    reloadUserOrders,
    systemSelected,
    toolbarFilters,
  } = useTransportOrder();
  const { orderTaskSelected, textSearchOrders } = useAppSelector(
    (state) => state.SAPTransportOrder
  );
  const sapTransportOrderActions = new SAPTransportOrderActions();
  const [openPopupTransCopy, setOpenPopupTransCopy] = useState(false);
  const [openPopupNewOrder, setOpenPopupNewOrder] = useState(false);
  const { showMessage, updateResultError, updateMessage } = useMessages();
  const { getI18nText } = useTranslations();
  const sapTransportOrderController = new SAPTransportOrderController();
  const { addNewOrder } = useDataManager();

  /**
   * Determina si el boton de liberar se tiene que mostrar. Para eso tiene que haber al menos
   * una orden/tarea tenga la fila editable
   */
  const determineVisibleBtnRelease = useMemo(() => {
    if (orderTaskSelected.length == 0) return false;
    if (orderTaskSelected.findIndex((row) => row.row_editable) != -1)
      return true;
    else return false;
  }, [orderTaskSelected]);

  /**
   * Determina si aparecerá el botón de ver objetos
   */
  const determineVisibleBtnObjects = useMemo(() => {
    if (orderTaskSelected.length == 0) return false;
    if (orderTaskSelected.findIndex((row) => row.hasObjects) != -1) return true;
    else return false;
  }, [orderTaskSelected]);

  /**
   * Gestiona las búsquedas desde el input
   */
  const handlerTextSearch = useCallback(
    () => (event: Ui5CustomEvent<InputDomRef, never>) => {
      event.preventDefault();
      if (
        (event.target.value as string).length > 2 ||
        (event.target.value as string).length == 0
      ) {
        // Quito las tareas seleccionadas porque sino hay una discrepancia entre la tabla
        // y los registros seleccionados y provoca que no funcione bien el transporte de copias.
        sapTransportOrderActions.setOrderTaskSelected([]);
        sapTransportOrderActions.setRowsExpanded([]);
        sapTransportOrderActions.setTextSearchOrders(
          event.target.value as string
        );
      }
    },
    []
  );

  /**
   * Gestiona el refresco del listado de ordenes/tareas
   */
  const handlerRefresh = useCallback(
    () => () => {
      sapTransportOrderActions.setTextSearchOrders("");
      reloadUserOrders();
    },
    [systemSelected, toolbarFilters]
  );

  /**
   * Gestione el transporte de copias de las ordenes seleccionadas
   */
  const handlerDoTransportCopy = useCallback(
    (data: FormTransportCopy) => {
      setOpenPopupTransCopy(false);
      doTransportCopy(data);
    },
    [orderTaskSelected]
  );
  /**
   * Gestiona el proceso de transporte de copias
   */
  const handlerTransportCopy = useCallback(() => {
    if (orderTaskSelected.length > 0) {
      sapTransportOrderActions.setDescriptionTransportCopy(
        orderTaskSelected[0].description
      );

      setOpenPopupTransCopy(true);
    }
    else {
      showMessage(
        getI18nText("transportOrder.tableOrder.actions.selectOneOrder"),
        MessageType.info
      )
    }

  }, [orderTaskSelected]);

  /**
   * Gestiona la liberación de las ordenes seleccionadas
   */
  const handlerReleaseOrder = useCallback(
    () => () => {
      if (orderTaskSelected.length > 0) {
        setOpenConfirmeRelease(true);
      } else {
        showMessage(
          getI18nText("transportOrder.tableOrder.actions.selectOneOrder"),
          MessageType.info
        )
      }
    },
    [orderTaskSelected]
  );

  /**
   * Gestiona la confirmación de la realización de la orden
   */
  const handlerDoReleaseOrders = useCallback(
    (action: string) => {
      if (action == "OK") {
        releaseOrders(
          orderTaskSelected
            .filter((row) => row.row_editable)
            .map((row) => {
              return { order: row.orderTask };
            })
        );
      }

      setOpenConfirmeRelease(false);
    },
    [orderTaskSelected]
  );

  /**
   * Realiza la acción de creación de la nueva orden
   */
  const handlerDoNewOrder = useCallback(
    (data: FormNewOrder) => {
      let toastID = showMessage(
        getI18nText("transportOrder.newOrder.popup.msgCreateInProcess"),
        MessageType.info,
        { autoClose: false, isLoading: true }
      );

      sapTransportOrderController
        .newOrder(
          new NewOrder(data.description, data.type, data.user)
        )
        .then((response) => {
          if (response.isSuccess) {
            setOpenPopupNewOrder(false);

            let orderCreated = response.getValue() as userOrdersDTO;
            updateMessage(
              toastID,
              getI18nText("transportOrder.newOrder.popup.msgOrderCreated", {
                order: orderCreated.order,
              }),
              MessageType.info
            );

            addNewOrder(orderCreated);
          } else {
            updateResultError(
              toastID,
              response.getErrorValue() as ErrorGraphql
            );
          }
        });
    },
    []
  );

  /**
   * Gestiona la visualización de los objetos de las ordenes
   */
  const handlerOrderObjects = useCallback(() => {
    if (orderTaskSelected.length > 0) {
      sapTransportOrderActions.setShowOrderObjects(true);
      sapTransportOrderActions.setOrdersObjectsSelected(
        orderTaskSelected
          .filter((row) => row.hasObjects)
          .map((row: FieldsOrdersTreeTable | FieldsTaskTreeTable) => {
            return {
              order: row.orderTask,
              description: row.description,
              row_editable: row.row_editable,
              type: row.type,
              user: row.user,
              parent_order:
                row.levelTree == "task"
                  ? (row as FieldsTaskTreeTable).parent_order
                  : "",
            };
          })
      );
    }
    else {
      showMessage(
        getI18nText("transportOrder.tableOrder.actions.selectOneOrder"),
        MessageType.info
      )
    }


  }, [orderTaskSelected]);

  return {
    openConfirmeRelease,
    setOpenConfirmeRelease,
    determineVisibleBtnRelease,
    handlerTextSearch,
    handlerReleaseOrder,
    handlerRefresh,
    openPopupTransCopy,
    setOpenPopupTransCopy,
    handlerDoTransportCopy,
    handlerTransportCopy,
    handlerDoReleaseOrders,
    openPopupNewOrder,
    setOpenPopupNewOrder,
    handlerDoNewOrder,
    determineVisibleBtnObjects,
    handlerOrderObjects,
    textSearchOrders,
  };
}
