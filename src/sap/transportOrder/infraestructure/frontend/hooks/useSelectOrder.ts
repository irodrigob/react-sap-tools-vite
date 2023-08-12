import SAPTransportOrderController from "sap/transportOrder/infraestructure/controller/sapTransportOrderController";
import { FiltersOrdersGraphQL } from "sap/transportOrder/infraestructure/types/transport";
import { STATUS } from "sap/transportOrder/infraestructure/utils/constants/constantsTransportOrder";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { userOrdersDTO } from "sap/transportOrder/infraestructure/dto/transportOrderDTO";
import { SelectableOrders } from "sap/transportOrder/domain/entities/selectableOrders";

export default function useSelectOrder() {
  const transportOrderController = new SAPTransportOrderController();
  const transportOrderActions = new SAPTransportOrderActions();
  const { showResultError } = useMessages();

  const getOrders = (orderType: string) => {
    // El filtro para leer las ordenes es fácil, el tipo de orden es el pasado por parámetro. Y la
    // orden/tarea tiene que ser modificable
    let paramServices: FiltersOrdersGraphQL = {
      orderTypes: [{ type: orderType }],
      orderStatus: [{ status: STATUS.CHANGEABLE }],
    };
    transportOrderActions.setLoadingSelectableOrders(true);
    transportOrderController.getSelectableOrders(orderType).then((response) => {
      if (response.isSuccess) {
        transportOrderActions.setLoadingSelectableOrders(false);
        transportOrderActions.setSelectableOrders(
          response.getValue() as SelectableOrders
        );
      } else {
        showResultError(response.getErrorValue() as ErrorGraphql);
      }
    });
  };

  return { getOrders };
}
