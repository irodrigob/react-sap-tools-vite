import { FC } from "react";
import {
    Input,
    InputDomRef,
    Text,
    ValueState,
    Ui5CustomEvent
} from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";
import { FiltersValueState, ParamsObjectTranslate } from "sap/translate/infraestructure/types/translate";


interface Props {
    paramsObjectsTranslate: ParamsObjectTranslate;
    setParamsObjectsTranslate: (value: ParamsObjectTranslate) => void;
    filterValueState: FiltersValueState;
    setFilterValueState: (value: FiltersValueState) => void;
}

const FilterDepthRef: FC<Props> = (props: Props) => {
    const { filterValueState, paramsObjectsTranslate, setFilterValueState, setParamsObjectsTranslate } = props
    const { getI18nText } = useTranslations();

    return (<Input placeholder={getI18nText("translate.filters.placeholderDepthRef")}
        value={paramsObjectsTranslate.depthRefs.toString()}
        type="Number"
        onChange={(event: Ui5CustomEvent<InputDomRef, never>) => {
            event.preventDefault();
            let depthRef = parseInt(event.target.value as string)

            let newFilterValueState = { ...filterValueState }
            newFilterValueState.depthRef = ValueState.None
            newFilterValueState.depthRefMessage = ""

            if (depthRef == 0 || isNaN(depthRef)) {
                depthRef = 1
                newFilterValueState.depthRef = ValueState.Information
                newFilterValueState.depthRefMessage = getI18nText("translate.filters.minDepthRef")
            }
            else if (depthRef > 10) {
                depthRef = 10
                newFilterValueState.depthRef = ValueState.Warning
                newFilterValueState.depthRefMessage = getI18nText("translate.filters.rangeDepthRef")

            }
            setParamsObjectsTranslate({
                ...paramsObjectsTranslate,
                depthRefs: depthRef
            });
            setFilterValueState(newFilterValueState)

        }}
        valueState={filterValueState.depthRef}
        valueStateMessage={<Text>{filterValueState.depthRefMessage}</Text>}
    />)
}

export default FilterDepthRef
