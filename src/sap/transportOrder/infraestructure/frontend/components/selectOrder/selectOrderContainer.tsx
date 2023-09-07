import { FC, useEffect } from "react";
import { ValueState } from "@ui5/webcomponents-react";
import useSelectOrder from "sap/transportOrder/infraestructure/frontend/hooks/useSelectOrder";
import InputWithTitleOrder from "./inputWithTitleOrder";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";
import InputOrder from "./inputOrder";
import { SelectorComponentType } from "sap/transportOrder/infraestructure/types/selectOrder.d";
import ComboOrder from "./comboOrder";

interface Props {
  orderType: string;
  showTasks: boolean;
  onSelectedOrder: (order: string) => void;
  orderValueState?: ValueState;
  setOrderValueState?: (state: ValueState) => void;
  orderValueStateMessage?: string;
  setOrderValueStateMessage?: (message: string) => void;
  showTitle?: boolean
  type?: SelectorComponentType
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
    showTitle,
    type
  } = props;
  const componentType = type ?? SelectorComponentType.inputWithTitle
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
    <>
      {componentType == SelectorComponentType.inputWithTitle && <InputWithTitleOrder
        showTasks={showTasks}
        onSelectedOrder={handlerSelectedOrder}
        orderValueState={orderValueState}
        setOrderValueState={setOrderValueState}
        orderValueStateMessage={orderValueStateMessage}
        setOrderValueStateMessage={setOrderValueStateMessage}
      />}
      {componentType == SelectorComponentType.input && <InputOrder
        showTasks={showTasks}
        onSelectedOrder={handlerSelectedOrder}
        orderValueState={orderValueState}
        setOrderValueState={setOrderValueState}
        orderValueStateMessage={orderValueStateMessage}
        setOrderValueStateMessage={setOrderValueStateMessage}
      />}
      {componentType == SelectorComponentType.combobox && <ComboOrder
        showTasks={showTasks}
        onSelectedOrder={handlerSelectedOrder}
        orderValueState={orderValueState}
        setOrderValueState={setOrderValueState}
        orderValueStateMessage={orderValueStateMessage}
        setOrderValueStateMessage={setOrderValueStateMessage}
      />}
    </>
  );
};

export default SelectOrderContainer;
