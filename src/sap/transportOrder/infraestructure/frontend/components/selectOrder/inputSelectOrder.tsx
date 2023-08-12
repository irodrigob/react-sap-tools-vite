import { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  FlexBox,
  Title,
  Input,
  InputDomRef,
  Ui5CustomEvent,
  Popover,
  ValueState,
  Text,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";
import DropdownIcon from "shared/frontend/components/dropdownIcon";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import ArrayUtils from "shared/utils/array/arrayUtils";
import { SelectableOrder } from "sap/transportOrder/domain/entities/selectableOrders";
import { InputSuggestionItemSelectEventDetail } from "@ui5/webcomponents/dist/Input";
import { OrdersData } from "sap/transportOrder/infraestructure/types/selectOrder";
import OrderSuggestionsItems from "./orderSuggestionsItems";
import OrdersList from "./ordersList";
import { TextField } from "@mui/material";

interface Props {
  showTasks: boolean;
  onSelectedOrder: (order: string) => void;
  orderValueState?: ValueState;
  setOrderValueState?: (state: ValueState) => void;
  orderValueStateMessage?: string;
  setOrderValueStateMessage?: (message: string) => void;
}

const InputSelectOrder: FC<Props> = (props: Props) => {
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
  const [openList, setOpenList] = useState(false);

  const popoverSelectOrder = useCallback((order: string) => {
    // Si se selecciona la orden vía selector la orden existira y se quitan los posibles estados
    if (setOrderValueState) setOrderValueState(ValueState.None);
    if (setOrderValueStateMessage) setOrderValueStateMessage("");

    onSelectedOrder(order);
    setOpenList(false);
  }, []);

  const onChangeOrder = useCallback(
    (event: Ui5CustomEvent<InputDomRef, never>) => {
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
    let ordersGroup = ArrayUtils.groupBy<SelectableOrder>(
      selectableOrders,
      (e) => e.order
    );
    let orders: OrdersData = [];

    for (const order in ordersGroup) {
      orders.push({
        order: ordersGroup[order][0].order,
        orderDesc: ordersGroup[order][0].orderDesc,
        isTask: false,
      });
      if (showTasks)
        ordersGroup[order]
          .filter((taskRow) => taskRow.task != "")
          .map((taskRow) => {
            orders.push({
              order: taskRow.task,
              orderDesc: taskRow.taskDesc,
              isTask: true,
            });
          });
    }
    setOrdersList(orders);
  }, [selectableOrders]);

  return (
    <FlexBox direction="Column">
      <Title level="H2" style={{ paddingBottom: "1rem" }}>
        {getI18nText("transportOrder.selectOrder.lblSelectOrder")}
      </Title>
      <Input
        id="inputOrderSelect"
        style={{ marginLeft: "1rem", width: "15rem" }}
        placeholder={getI18nText(
          "transportOrder.selectOrder.placeholderSelectOrder"
        )}
        showSuggestions={true}
        onSuggestionItemSelect={(
          event: Ui5CustomEvent<
            InputDomRef,
            InputSuggestionItemSelectEventDetail
          >
        ) => {
          onSelectedOrder(event.detail.item.id as string);
        }}
        icon={
          <DropdownIcon
            openSystemList={openList}
            onClick={() => {
              setOpenList(!openList);
            }}
          />
        }
        value={selectedOrder}
        valueState={orderValueState}
        valueStateMessage={<Text>{orderValueStateMessage}</Text>}
        onChange={(event: Ui5CustomEvent<InputDomRef, never>) => {
          event.preventDefault();
          onChangeOrder(event);
        }}
      >
        <OrderSuggestionsItems orders={ordersList} />
      </Input>
      <Popover
        opener="inputOrderSelect"
        open={openList}
        placementType="Right"
        onAfterClose={() => {
          setOpenList(false);
        }}
      >
        <OrdersList
          showTasks={showTasks}
          onSelectedOrder={popoverSelectOrder}
        />
      </Popover>
    </FlexBox>
  );
};

export default InputSelectOrder;