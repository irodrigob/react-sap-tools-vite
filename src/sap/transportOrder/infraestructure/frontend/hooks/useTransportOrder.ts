import { useCallback } from "react";
import useFilterValues from "sap/transportOrder/infraestructure/frontend/components/filtersOrdersTable/useFilterValues";
import { GATEWAY_CONF } from "sap/general/infraestructure/utils/constants/constants";
import SAPController from "sap/general/infraestructure/controller/sapController";
import SAPTransportOrderController from "sap/transportOrder/infraestructure/controller/sapTransportOrderController";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { useTranslations } from "translations/i18nContext";
import {
  FieldsOrdersTreeTable,
  FieldsTaskTreeTable,
  Orders,
  SystemUsers,
} from "sap/transportOrder/infraestructure/types/transport";
import { FormTransportCopy } from "sap/transportOrder/infraestructure/frontend/components/popupTransCopy/transCopy";
import {
  releaseOrdersDTOArray,
  transportCopyDTO,
  userOrdersDTO,
} from "sap/transportOrder/infraestructure/dto/transportOrderDTO";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";
import MessageManagerController from "messageManager/infraestructure/controller/messageManagerController";
import SystemController from "systems/infraestructure/controller/systemController";
import { useAppSelector } from "shared/storage/useStore";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";
import UpdateOrder from "sap/transportOrder/domain/entities/updateOrder";
import useDataManager from "sap/transportOrder/infraestructure/frontend/hooks/useDataManager";

export default function useTransportOrder() {
  const { getDefaultFilters, convertFilter2paramsGraphql } = useFilterValues();
  const { systemSelected } = useAppSelector((state) => state.System);
  const { orderTaskSelected, toolbarFilters, orderListTree } = useAppSelector(
    (state) => state.SAPTransportOrder
  );
  const sapTransportOrderActions = new SAPTransportOrderActions();
  const { updateDataFromReleaseOrder, postLoadUserOrder } = useDataManager();
  const sapController = new SAPController();
  const systemController = new SystemController();
  const transportOrderController = new SAPTransportOrderController();
  const { getI18nText, language } = useTranslations();
  const {
    showResultError,
    showMessage,
    convertServiceSAPMsgType,
    updateMessage,
    updateResultError,
  } = useMessages();
  const messageManagerController = new MessageManagerController();

  /*************************************
   * Funciones
   ************************************/
  /**
   * Proceso de lectura de datos de las ordenes del usuario
   */
  const loadInitialData = useCallback(() => {
    let URLBaseConnect = systemController.getURL2ConnectSystem();

    sapTransportOrderActions.setLoadingOrders(true);
    transportOrderController.setSystemChanged(false);

    // Obtención de los filtros por defecto
    let filterValues = getDefaultFilters();
    sapTransportOrderActions.setToolbarFilters(filterValues);

    // Parametros para poder llamar al servicio
    let paramsService = convertFilter2paramsGraphql(filterValues);

    let url2Service = sapController.buildSAPUrl2Connect(
      URLBaseConnect,
      GATEWAY_CONF.ODATA_TRANSP_SERVICE
    );
    sapTransportOrderActions.setURLOData(url2Service);

    // Lista inicial de las ordenes del usuario
    transportOrderController
      .getUserOrdersList(paramsService)
      .then((resultgetOrderList) => {
        sapTransportOrderActions.setLoadingOrders(false);
        if (resultgetOrderList.isSuccess) {
          postLoadUserOrder(resultgetOrderList.getValue() as userOrdersDTO[]);

          // Leemos los sistemas a los que se puede hacer el transport de copia
          transportOrderController
            .getSystemsTransport(language)
            .then((resultSystemsTransport) => {
              if (resultSystemsTransport.isFailure) {
                showResultError(
                  resultSystemsTransport.getErrorValue() as ErrorGraphql
                );
              }
            });
        } else {
          showResultError(resultgetOrderList.getErrorValue() as ErrorGraphql);
        }
      });

    // Usuarios del sistema que pueden estar en una orden. Se usará para el contro que permite cambiar el usuario de una orden
    getSystemsUsers();
  }, []);

  /**
   * Función que realiza la lectura de nuevo de las ordendes del usuario
   * la diferencia. Esta función solo realiza la llamada al método de GraphQL y no tiene
   * que hacer nada más ya que los loader o lo que sea ya se gestiona desde fuera de esta llamada.
   */
  const reloadUserOrders = useCallback(() => {
    sapTransportOrderActions.setOrderTaskSelected([]);
    sapTransportOrderActions.setLoadingOrders(true);
    sapTransportOrderActions.setRowsExpanded([]);
    sapTransportOrderActions.setAutoResetExpanded(true); // Fuerzo el reset para que al cargar nuevos datos las filas se vuelvan a resetear
    transportOrderController.clearVariablesObjects();

    transportOrderController
      .getUserOrdersList(convertFilter2paramsGraphql(toolbarFilters))
      .then((response) => {
        sapTransportOrderActions.setLoadingOrders(false);
        if (response.isSuccess) {
          postLoadUserOrder(response.getValue() as userOrdersDTO[]);
        }
      });
  }, [systemSelected, toolbarFilters]);

  const doTransportCopy = useCallback(
    (data: FormTransportCopy) => {
      let toastID = showMessage(
        getI18nText("transportOrder.transportCopy.popup.msgTransportInProcess"),
        MessageType.info,
        { autoClose: false, isLoading: true }
      );
      sapTransportOrderActions.setSystemTransportCopy(data.system);

      transportOrderController
        .doTransportCopy(
          data.system,
          data.description,
          orderTaskSelected.map((row: FieldsOrdersTreeTable) => {
            return { order: row.orderTask };
          }),
          language
        )
        .then((response) => {
          if (response.isSuccess) {
            let returnTransport = response.getValue() as transportCopyDTO;

            messageManagerController.addFromSAPArrayReturn(
              returnTransport.return
            );

            updateMessage(
              toastID,
              returnTransport.return[0].message,
              convertServiceSAPMsgType(returnTransport.return[0].type)
            );
          } else {
            updateResultError(
              toastID,
              response.getErrorValue() as ErrorGraphql
            );
          }
        });
    },
    [orderTaskSelected]
  );

  /**
   * Actualiza los datos de una orden/tarea
   * @param orderData | Datos de la orden o tarea
   */
  const changeDataOrder = useCallback(
    (orderData: FieldsOrdersTreeTable | FieldsTaskTreeTable) => {
      return transportOrderController.UpdateOrder(
        new UpdateOrder(
          orderData.orderTask,
          orderData.description,
          orderData.user
        ),
        language
      );
    },
    []
  );

  /**
   * Lectura de los usuarios de SAP que pueden estar en una orden/tarea
   */
  const getSystemsUsers = useCallback(() => {
    transportOrderController.getSystemsUsers().then((response) => {
      if (response.isSuccess)
        sapTransportOrderActions.setSystemUsers(
          response.getValue() as SystemUsers
        );
    });
  }, []);

  /**
   * Libera las ordenes/tareas pasadas por parámetro
   * @param orders | Array de ordenes
   */
  const releaseOrders = useCallback(
    (orders: Orders) => {
      let toastID = showMessage(
        getI18nText("transportOrder.releaseOrders.releaseInProcess"),
        MessageType.info,
        { autoClose: false, isLoading: true }
      );

      transportOrderController
        .releaseOrders(orders, language)
        .then((response) => {
          if (response.isSuccess) {
            // Como al actualiar la tabla se desmarca las filas seleccionadas y me desajusta la toolbar de acciones. Por ello
            // las desmarco para que se resetee todo bien.
            sapTransportOrderActions.setOrderTaskSelected([]);

            let returnRelease = response.getValue() as releaseOrdersDTOArray;

            messageManagerController.addFromSAPArrayReturn(
              returnRelease.map((row) => {
                return row.return;
              })
            );

            updateDataFromReleaseOrder(returnRelease);

            updateMessage(
              toastID,
              getI18nText("transportOrder.releaseOrders.releaseCompleted"),
              MessageType.success
            );
          } else {
            updateResultError(
              toastID,
              response.getErrorValue() as ErrorGraphql
            );
          }
        });
    },
    [orderListTree]
  );

  return {
    loadInitialData,
    reloadUserOrders,
    doTransportCopy,
    changeDataOrder,
    releaseOrders,
    systemSelected,
    toolbarFilters,
  };
}
