import { FC } from "react";
import {
  RadioButton,
  FlexBox,
  Ui5CustomEvent,
  RadioButtonDomRef,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import { useTranslations } from "translations/i18nContext";
import { TYPE } from "sap/transportOrder/infraestructure/utils/constants/constantsTransportOrder";

interface Props {
  onChange: (data: any) => void;
  value: string;
}

const SelectOrderType: FC<Props> = (props) => {
  const { onChange, value } = props;
  const { getI18nText } = useTranslations();

  return (
    <FlexBox justifyContent="SpaceBetween" direction="Row">
      <RadioButton
        onChange={(event) => {
          event.preventDefault();
          onChange(TYPE.WORKBENCH);
        }}
        text={getI18nText("transportOrder.orderTypes.workbench")}
        name="orderType"
        checked={value == TYPE.WORKBENCH ? true : false}
      />
      <RadioButton
        onChange={(event) => {
          event.preventDefault();
          onChange(TYPE.CUSTOMIZING);
        }}
        text={getI18nText("transportOrder.orderTypes.customizing")}
        name="orderType"
        checked={value == TYPE.CUSTOMIZING ? true : false}
      />
    </FlexBox>
  );
};

export default SelectOrderType;
