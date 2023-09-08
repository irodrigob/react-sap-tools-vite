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
            let objectName = event.target.value?.toUpperCase() as string
            if (objectName == "") {
                setFilterValueState({
                    ...filterValueState,
                    objectNameState: ValueState.Error,
                    objectNameStateMessage: getI18nText("translate.filters.fieldMandatory"),
                });
            }
            else {
                setFilterValueState({
                    ...filterValueState,
                    objectNameState: ValueState.None,
                    objectNameStateMessage: "",
                });
                setParamsObjectsTranslate({
                    ...paramsObjectsTranslate,
                    objectName: objectName
                });
            }

        }}
    />)
}

export default FilterDepthRef
