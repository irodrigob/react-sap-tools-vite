import { FC } from "react";
import { SuggestionItem } from "@ui5/webcomponents-react";
import { OrdersData } from "sap/transportOrder/infraestructure/types/selectOrder";
import { useTranslations } from "translations/i18nContext";

interface Props {
  orders: OrdersData;
}

const OrderSuggestionsItems: FC<Props> = (props: Props) => {
  const { orders } = props;
  const { getI18nText } = useTranslations();

  return (
    <>
      {" "}
      {orders.map((rowOrder) => {
        return (
          <SuggestionItem
            key={rowOrder.order}
            id={rowOrder.order}
            data-id={rowOrder.order}
            text={`${rowOrder.order} - ${rowOrder.orderDesc}`}
          />
        );
      })}
    </>
  );
};

export default OrderSuggestionsItems;
