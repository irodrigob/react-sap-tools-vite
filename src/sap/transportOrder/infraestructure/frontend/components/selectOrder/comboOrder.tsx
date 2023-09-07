import { FC, useCallback, useEffect, useState } from "react";
import {
  Ui5CustomEvent,
  ValueState,
  Text,
  ComboBox,
  ComboBoxItem,
  ComboBoxDomRef,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import { OrdersData } from "sap/transportOrder/infraestructure/types/selectOrder";
import useSelectOrder from "sap/transportOrder/infraestructure/frontend/hooks/useSelectOrder";

interface Props {
  showTasks: boolean;
  onSelectedOrder: (order: string) => void;
  orderValueState?: ValueState;
  setOrderValueState?: (state: ValueState) => void;
  orderValueStateMessage?: string;
  setOrderValueStateMessage?: (message: string) => void;
}

const ComboOrder: FC<Props> = (props: Props) => {
  const {
    showTasks,
    onSelectedOrder,
    orderValueState,
    setOrderValueState,
    orderValueStateMessage,
    setOrderValueStateMessage,
  } = props;
  const { getI18nText } = useTranslations();
  const { selectableOrders, selectedOrder } = useAppSelector(
    (state) => state.SAPTransportOrder
  );
  const [ordersList, setOrdersList] = useState<OrdersData>([]);
  const { convertOrders2ListFormat } = useSelectOrder()
  const [valueSelected, setValueSelected] = useState("");

  const onChangeOrder = useCallback(
    (event: Ui5CustomEvent<ComboBoxDomRef, never>) => {
      // si se selecciona el valor desde el suggestion viene la orden y su descripcion.
      // Para validarlo tengo que separarlo y solo quedarme con la orden.
      let values = (event.target.value as string).split("-");
      let order = values[0].trim();
      if (ordersList.findIndex((row) => row.order == order) == -1) {
        if (setOrderValueState) setOrderValueState(ValueState.Error);
        if (setOrderValueStateMessage)
          setOrderValueStateMessage(
            getI18nText("transportOrder.selectOrder.orderNotExist", {
              order: order,
            })
          );
      } else {
        if (setOrderValueState) setOrderValueState(ValueState.None);
        if (setOrderValueStateMessage) setOrderValueStateMessage("");

        onSelectedOrder(order);
      }
    },
    [ordersList]
  );

  useEffect(() => {
    setOrdersList(convertOrders2ListFormat(selectableOrders, showTasks));
  }, [selectableOrders]);

  return (
    <>
      <ComboBox
        filter="Contains"
        placeholder={getI18nText(
          "transportOrder.selectOrder.placeholderSelectOrder"
        )}
        onChange={(event: Ui5CustomEvent<ComboBoxDomRef, never>) => {
          event.preventDefault();
          onChangeOrder(event)
        }}
        value={valueSelected}
        valueState={orderValueState}
        valueStateMessage={<Text>{orderValueStateMessage}</Text>}
      >
        {ordersList.map((rowOrder) => {
          return (
            <ComboBoxItem
              text={`${rowOrder.order} - ${rowOrder.orderDesc}`}
              key={rowOrder.order}
              id={rowOrder.order}
            />
          );
        })}
      </ComboBox>
    </>
  );
};

export default ComboOrder;
