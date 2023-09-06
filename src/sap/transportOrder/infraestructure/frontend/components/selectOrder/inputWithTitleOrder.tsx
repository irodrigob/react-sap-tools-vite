import { FC } from "react";
import {
  FlexBox,
  Title,
  ValueState,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";
import { useTranslations } from "translations/i18nContext";
import InputOrder from "./inputOrder";


interface Props {
  showTasks: boolean;
  onSelectedOrder: (order: string) => void;
  orderValueState?: ValueState;
  setOrderValueState?: (state: ValueState) => void;
  orderValueStateMessage?: string;
  setOrderValueStateMessage?: (message: string) => void;
}

const InputWithTitleOrder: FC<Props> = (props: Props) => {
  const {
    showTasks,
    onSelectedOrder,
    orderValueState,
    setOrderValueState,
    orderValueStateMessage,
    setOrderValueStateMessage,
  } = props;
  const { getI18nText } = useTranslations();



  return (
    <FlexBox direction="Column">
      <Title level="H4" style={{ paddingBottom: "1rem" }}>
        {getI18nText("transportOrder.selectOrder.lblSelectOrder")}
      </Title>
      <InputOrder
        onSelectedOrder={onSelectedOrder}
        showTasks={showTasks}
        orderValueState={orderValueState}
        orderValueStateMessage={orderValueStateMessage}
        setOrderValueState={setOrderValueState}
        setOrderValueStateMessage={setOrderValueStateMessage}
      />
    </FlexBox>
  );
};

export default InputWithTitleOrder;
