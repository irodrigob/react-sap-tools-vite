import { FC, useEffect, useState } from "react";
import {
  List,
  CustomListItem,
  FlexBox,
  Text,
  Ui5CustomEvent,
  ListDomRef,
  Title,
} from "@ui5/webcomponents-react";
import { useAppSelector } from "shared/storage/useStore";
import { OrdersData } from "sap/transportOrder/infraestructure/types/selectOrder";
import { useTranslations } from "translations/i18nContext";
import { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import useSelectOrder from "sap/transportOrder/infraestructure/frontend/hooks/useSelectOrder";

interface Props {
  showTasks: boolean;
  showHeader?: boolean;
  onSelectedOrder: (order: string) => void;
}

const headerList = (title: string) => {
  return (
    <Title level="H2" style={{ paddingBottom: "1rem" }}>
      {title}
    </Title>
  );
};

const OrdersList: FC<Props> = (props: Props) => {
  const { showTasks, showHeader, onSelectedOrder } = props;
  const { selectableOrders, selectedOrder } = useAppSelector(
    (state) => state.SAPTransportOrder
  );
  const [ordersList, setOrdersList] = useState<OrdersData>([]);
  const { getI18nText } = useTranslations();
  const { convertOrders2ListFormat } = useSelectOrder()

  useEffect(() => {
    setOrdersList(convertOrders2ListFormat(selectableOrders, showTasks));
  }, [selectableOrders]);

  return (
    <List
      onItemClick={(
        event: Ui5CustomEvent<ListDomRef, ListItemClickEventDetail>
      ) => {
        // console.log(event.detail.item.id);
        onSelectedOrder(event.detail.item.id as string);
      }}
      header={
        showHeader
          ? headerList(getI18nText("transportOrder.selectOrder.lblSelectOrder"))
          : null
      }
    >
      {ordersList.map((rowOrder) => {
        return (
          <CustomListItem key={rowOrder.order} id={rowOrder.order}>
            <FlexBox
              justifyContent="Start"
              alignItems="Start"
              style={{
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontWeight: rowOrder.isTask ? "normal" : "bold",
                  paddingLeft: rowOrder.isTask ? "1rem" : "0rem",
                }}
              >
                {rowOrder.order}
                {" - "} {rowOrder.orderDesc}
                <span style={{ fontStyle: "italic" }}>
                  {rowOrder.order == selectedOrder
                    ? ` (${getI18nText("transportOrder.selectOrder.selected")})`
                    : ""}
                </span>
              </Text>
            </FlexBox>
          </CustomListItem>
        );
      })}
    </List>
  );
};

export default OrdersList;
