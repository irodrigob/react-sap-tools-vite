import { FC, useEffect, useState } from "react";
import { FlexBox, ValueState } from "@ui5/webcomponents-react";
import ObjectsSelected from "./objectsSelected";
import { OrderObjectsKey } from "sap/transportOrder/infraestructure/types/transport";
import useOrderObjects from "sap/transportOrder/infraestructure/frontend/hooks/useOrderObjects";
import SelectOrderContainer from "sap/transportOrder/infraestructure/frontend/components/selectOrder/selectOrderContainer";

interface Props {
  objectsSelected: OrderObjectsKey;
  onSelectedOrder: (order: string) => void;
  orderValueState?: ValueState;
  setOrderValueState?: (state: ValueState) => void;
  orderValueStateMessage?: string;
  setOrderValueStateMessage?: (message: string) => void;
}

const MoveObjectsContainer: FC<Props> = (props: Props) => {
  const {
    objectsSelected,
    onSelectedOrder,
    orderValueState,
    setOrderValueState,
    orderValueStateMessage,
    setOrderValueStateMessage,
  } = props;
  const { getOrderTypeOrderObject } = useOrderObjects();
  const [orderType, setOrderType] = useState("");

  useEffect(() => {
    // Sacamos el tipo de orden del primero objeto seleccionado. Ya que no se puede mover
    // objetos de distintas ordenes
    setOrderType(getOrderTypeOrderObject(objectsSelected[0]) as string);
  }, [objectsSelected]);

  return (
    <FlexBox alignItems="Start" direction="Column">
      <ObjectsSelected objectsSelected={objectsSelected} />
      <SelectOrderContainer
        orderType={orderType}
        showTasks={true}
        onSelectedOrder={onSelectedOrder}
        orderValueState={orderValueState}
        setOrderValueState={setOrderValueState}
        orderValueStateMessage={orderValueStateMessage}
        setOrderValueStateMessage={setOrderValueStateMessage}
        showTitle={true}
      />
    </FlexBox>
  );
};

export default MoveObjectsContainer;
