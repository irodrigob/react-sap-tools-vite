import SAPTransportOrderController from "sap/transportOrder/infraestructure/controller/sapTransportOrderController";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";
import useMessages from "shared/infraestructure/hooks/useMessages";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { SelectableOrders } from "sap/transportOrder/domain/entities/selectableOrders";

export default function useSelectOrder() {
  const transportOrderController = new SAPTransportOrderController();
  const transportOrderActions = new SAPTransportOrderActions();
  const { showResultError } = useMessages();

  const getOrders = (orderType: string) => {
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
