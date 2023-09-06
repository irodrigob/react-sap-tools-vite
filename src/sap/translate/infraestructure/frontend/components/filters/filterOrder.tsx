import { FC, useCallback } from "react";
import {
    SelectableObjects,
    ParamsObjectTranslate,
    FiltersValueState,
} from "sap/translate/infraestructure/types/translate";
import { ValueState } from "@ui5/webcomponents-react/ssr";
import TranslateController from "sap/translate/infraestructure/controller/translateController";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import SelectOrderContainer from "sap/transportOrder/infraestructure/frontend/components/selectOrder/selectOrderContainer";
import { TYPE } from "sap/transportOrder/infraestructure/utils/constants/constantsTransportOrder"

interface Props {
    paramsObjectsTranslate: ParamsObjectTranslate;
    setParamsObjectsTranslate: (value: ParamsObjectTranslate) => void;
    filterValueState: FiltersValueState;
    setFilterValueState: (value: FiltersValueState) => void;
}


const FilterOrder: FC<Props> = (props: Props) => {

    const { filterValueState, paramsObjectsTranslate, setFilterValueState, setParamsObjectsTranslate } = props
    const onSelectedOrder = useCallback((order: string) => {
        setParamsObjectsTranslate({
            ...paramsObjectsTranslate,
            order: order
        })
    }, [])
    const setOrderValueState = useCallback((state: ValueState) => {
        setFilterValueState({
            ...filterValueState,
            objectState: state
        })
    }, [])
    const setOrderValueStateMessage = useCallback((message: string) => {
        setFilterValueState({
            ...filterValueState,
            objectStateMessage: message
        })
    }, [])

    return <SelectOrderContainer
        orderType={TYPE.WORKBENCH}
        showTasks={false}
        onSelectedOrder={onSelectedOrder}
        orderValueState={filterValueState.orderState}
        setOrderValueState={setOrderValueState}
        orderValueStateMessage={filterValueState.orderStateMessage}
        setOrderValueStateMessage={setOrderValueStateMessage}
    />
}

export default FilterOrder