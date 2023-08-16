import { FC, useEffect } from "react";
import { ValueState } from "@ui5/webcomponents-react";
import useSelectOrder from "sap/transportOrder/infraestructure/frontend/hooks/useSelectOrder";
import InputSelectOrder from "./inputSelectOrder";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";

interface Props {
  orderType: string;
  showTasks: boolean;
  onSelectedOrder: (order: string) => void;
  orderValueState?: ValueState;
  setOrderValueState?: (state: ValueState) => void;
  orderValueStateMessage?: string;
  setOrderValueStateMessage?: (message: string) => void;
}
const SelectOrderContainer: FC<Props> = (props: Props) => {
  const {
    orderType,
    showTasks,
    onSelectedOrder,
    orderValueState,
    setOrderValueState,
    orderValueStateMessage,
    setOrderValueStateMessage,
  } = props;
  const { getOrders } = useSelectOrder();
  const transportOrderActions = new SAPTransportOrderActions();

  useEffect(() => {
    if (orderType != "") {
      getOrders(orderType);
      transportOrderActions.setSelectedOrder("");
    }
  }, [orderType]);

  /**
   * Gestiona cuando se selecciona una orden o tarea
   * @param order | Orden/Tarea
   */
  const handlerSelectedOrder = (order: string) => {
    transportOrderActions.setSelectedOrder(order);
    onSelectedOrder(order);
  };

  return (
    <InputSelectOrder
      showTasks={showTasks}
      onSelectedOrder={handlerSelectedOrder}
      orderValueState={orderValueState}
      setOrderValueState={setOrderValueState}
      orderValueStateMessage={orderValueStateMessage}
      setOrderValueStateMessage={setOrderValueStateMessage}
    />
  );
};

export default SelectOrderContainer;
