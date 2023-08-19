import { useCallback } from "react";
import SAPTransportOrderController from "sap/transportOrder/infraestructure/controller/sapTransportOrderController";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { useTranslations } from "translations/i18nContext";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";
import {
  OrderObjectsKey,
  OrderObjectKey,
  OrderObjects,
  Orders,
} from "sap/transportOrder/infraestructure/types/transport";
import { useAppSelector } from "shared/storage/useStore";
import OrderObject from "sap/transportOrder/domain/entities/orderObject";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { responseDeleteOrderObject } from "sap/transportOrder/infraestructure/types/application";
import useDataManagerObjects from "./useDataManagerObjects";
import ArrayUtils from "shared/utils/array/arrayUtils";
import { ReturnsDTO } from "shared/dto/generalDTO";
import MessageManagerController from "messageManager/infraestructure/controller/messageManagerController";
import { SAPMessageType } from "messageManager/infraestructure/types/msgManagerTypes";
import useDataManager from "./useDataManager";

export default function useOrderObjects() {
  const sapTransportOrderActions = new SAPTransportOrderActions();
  const transportOrderController = new SAPTransportOrderController();
  const { getI18nText } = useTranslations();
  const { orderObjects, ordersObjectsSelected, orderListTree } = useAppSelector(
    (state) => state.SAPTransportOrder
  );
  const { showResultError, updateMessage, updateResultError, showMessage } =
    useMessages();
  const { deleteObjectsModel } = useDataManagerObjects();
  const messageManagerController = new MessageManagerController();
  const { udpateHasObjects } = useDataManager();

  /**
   * Lectura de los objetos de las ordenes pasadas por parámetro. Este proceso
   * es el unico que llama a SAP y guarda el resultado en el storage de la APP
   * @param orders
   */
  const loadOrderObjects = useCallback(
    (orders: Orders) => {
      let newOrderObjects: OrderObjects = structuredClone(orderObjects);
      let ordersToSearch: Orders = [];

      // Si la orden no existe en el modelo global se añade y en caso contrario
      // se marca que se esta leyendo sus ordenes y resetea los objetos de la misma
      orders.forEach((order) => {
        let index = orderObjects.findIndex(
          (orderObject: OrderObject) => orderObject.order == order.order
        );

        ordersToSearch.push(order);
        if (index == -1) {
          newOrderObjects.push({
            order: order.order,
            objects: [],
            loadingData: true,
          });
        } else {
          newOrderObjects[index].loadingData = true;
          newOrderObjects[index].objects = []; // Quito los objetos porque se van a refrescar
        }
      });

      // Si hay que buscar ordenes guardo las nuevas ordenes y lanzo el proceso de lectura
      if (ordersToSearch.length > 0) {
        sapTransportOrderActions.setOrderObjects(newOrderObjects);
        transportOrderController
          .getOrderObjects(ordersToSearch)
          .then((response) => {
            // Una cosa curiosa, y es que tengo que hacer una copia de objeto porque el newOrderObjects en este punto
            // es inmutable, creo que es porque lo añado en el redux.
            let postOrderObjects: OrderObjects =
              structuredClone(newOrderObjects);
            if (response.isSuccess) {
              let responseOrderObjects = response.getValue() as OrderObjects;

              postOrderObjects
                .filter((row) => row.loadingData)
                .forEach((row) => {
                  row.loadingData = false;
                  let responseIndex = responseOrderObjects.findIndex(
                    (responseRow) => responseRow.order == row.order
                  );
                  if (responseIndex != -1) {
                    row.objects = responseOrderObjects[responseIndex].objects;
                  }
                });
            } else {
              showResultError(response.getErrorValue() as ErrorGraphql);
              postOrderObjects
                .filter((row) => row.loadingData)
                .forEach((row, index) => {
                  postOrderObjects[index].loadingData = false;
                });
            }
            sapTransportOrderActions.setOrderObjects(postOrderObjects);
            // Sincronizo si hay objetos en la orden en los procesos de lectura
            udpateHasObjects(postOrderObjects);
          });
      }
    },
    [orderObjects]
  );

  /**
   * Proceso del borrado de objetos
   * @param objects | Lista de objectos
   */
  const processDeleteOrderObjects = (objects: OrderObjectsKey) => {
    let toastID = showMessage(
      getI18nText("transportOrder.orderObjects.deleteObjects.deleteInProcess"),
      MessageType.info
    );
    let promises: Promise<responseDeleteOrderObject>[] = [];
    objects.forEach((row: OrderObjectKey) => {
      promises.push(transportOrderController.deleteOrderObject(row));
    });
    Promise.allSettled(promises).then((responsesPromise) => {
      let deletedOrderObjects: OrderObjectsKey = [];
      responsesPromise.forEach((responsePromise) => {
        if (responsePromise.status == "fulfilled") {
          let response = (
            responsePromise as PromiseFulfilledResult<responseDeleteOrderObject>
          )?.value;
          if (response.isSuccess) {
            // Guardo todos los objetos borrados correctamente
            deletedOrderObjects.push(response.getValue() as OrderObjectKey);
          } else {
            updateResultError(
              toastID,
              response.getErrorValue() as ErrorGraphql
            );
          }
        } else {
          // Esto no debería de ocurrir porque cualquier excepcion se captura en la clase de aplicación.
          // Aún asi dejo la lectura del error y ver como gestionarlo
          //let responseError = (responsePromise as PromiseRejectedResult)
          //  ?.reason;
        }

        if (deletedOrderObjects.length > 0) {
          updateMessage(
            toastID,
            getI18nText(
              "transportOrder.orderObjects.deleteObjects.deleteCompleted"
            ),
            MessageType.success
          );
          deleteObjectsModel(deletedOrderObjects);
        }
      });
    });
  };

  /**
   * Refresca los objetos de las ordenes seleccionadas
   */
  const reloadObjectOrders = useCallback(() => {
    loadOrderObjects(
      ordersObjectsSelected.map((row) => {
        return { order: row.order };
      })
    );
  }, [ordersObjectsSelected]);

  //ordersObjectsSelected
  /**
   * Verifica que solo se puedan mover objetos de ordenes del mismo tipo
   * @param objectsList | Objetos seleccionados
   * @returns Verdadero si todas las ordenes son del mismo tipo
   */
  const checkOrderTypeMoveOrders = useCallback(
    (objectsList: OrderObjectsKey) => {
      let orderGrouped = ArrayUtils.groupBy<OrderObjectKey>(
        objectsList,
        (e) => e.order
      );

      let orderType = "";
      for (const order in orderGrouped) {
        let orderData = ordersObjectsSelected.find((row) => row.order == order);
        if (orderData) {
          if (orderType == "") orderType = orderData.type;
          else if (orderType != orderData.type) return false;
        }
      }
      return true;
    },
    [ordersObjectsSelected]
  );
  /**
   * Verifica si alguna orden los objetos seleccionados sean editale.
   * @param objectsList | Lista de objetos seleccionados
   * @returns Verdadero si todas las ordenes son editables
   */
  const checkOrderEditable = useCallback(
    (objectsList: OrderObjectsKey) => {
      let orderGrouped = ArrayUtils.groupBy<OrderObjectKey>(
        objectsList,
        (e) => e.order
      );

      for (const order in orderGrouped) {
        let orderData = ordersObjectsSelected.find((row) => row.order == order);
        if (orderData && !orderData.row_editable) return false;
      }
      return true;
    },
    [ordersObjectsSelected]
  );

  /**
   * Devuelve el tipo de orden en base a los objetos seleccionados
   * @param orderObject | Objetos seleccionado
   * @returns Devuelve el tipo de orden
   */
  const getOrderTypeOrderObject = useCallback(
    (orderObject: OrderObjectKey) => {
      let order =
        orderObject.parent_order != ""
          ? orderObject.parent_order
          : orderObject.order;
      return orderListTree.find((row) => row.orderTask == order)?.type;
    },
    [orderListTree]
  );

  /**
   * Proceso para mover objetos de una orden a otra
   * @param orderTo | Orden destino
   * @param orderObjects | Objetos en ordenes a mover
   */
  const processMoveOrderObjects = (
    orderTo: string,
    orderObjects: OrderObjectsKey
  ) => {
    let toastID = showMessage(
      getI18nText("transportOrder.orderObjects.moveObjects.moveInProcess"),
      MessageType.info
    );
    // Obtengo las ordenes unicas de los objetos
    let uniqueOrders: Orders = [];
    orderObjects.reduce((previous, actual) => {
      if (uniqueOrders.findIndex((row) => row.order == previous.order) == -1)
        uniqueOrders.push({ order: previous.order });
      return previous;
    });
    // Si hay un solo registro en el array de objetos seleccionados el reduce no funciona, por eso tengo que hacerlo a manija
    // la inserción.
    if (uniqueOrders.length == 0)
      uniqueOrders.push({ order: orderObjects[0].order });

    // Añado la orden destino
    uniqueOrders.push({ order: orderTo });

    transportOrderController
      .moveOrderObjects(orderTo, orderObjects)
      .then((response) => {
        if (response.isSuccess) {
          let responseReturn = response.getValue() as ReturnsDTO;

          // Se pasa al gestor de mensajes para que se puedan consultar todos los mensajes devueltos
          messageManagerController.addFromSAPArrayReturn(responseReturn);

          // Se muestra un error generico en caso de ir todo bien o de existir errores.
          if (
            responseReturn.findIndex(
              (row) => row.type == SAPMessageType.error
            ) != -1
          )
            updateMessage(
              toastID,
              getI18nText(
                "transportOrder.orderObjects.moveObjects.moveWithErrors"
              ),
              MessageType.error
            );
          else
            updateMessage(
              toastID,
              getI18nText(
                "transportOrder.orderObjects.moveObjects.moveCompleted"
              ),
              MessageType.success
            );
          // Se vuelven a leer los objetos de las ordenes implicada para que se muestren bien en los listados
          loadOrderObjects(uniqueOrders);
        } else {
          updateResultError(toastID, response.getErrorValue() as ErrorGraphql);
        }
      });
  };

  return {
    loadOrderObjects,
    processDeleteOrderObjects,
    reloadObjectOrders,
    checkOrderTypeMoveOrders,
    checkOrderEditable,
    getOrderTypeOrderObject,
    processMoveOrderObjects,
  };
}
