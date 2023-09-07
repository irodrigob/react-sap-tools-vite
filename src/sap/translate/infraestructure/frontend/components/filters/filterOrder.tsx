import { FC, useCallback, useEffect, useState } from "react";
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
import { SelectorComponentType } from "sap/transportOrder/infraestructure/types/selectOrder.d";

interface Props {
    paramsObjectsTranslate: ParamsObjectTranslate;
    setParamsObjectsTranslate: (value: ParamsObjectTranslate) => void;
    filterValueState: FiltersValueState;
    setFilterValueState: (value: FiltersValueState) => void;
}


const FilterOrder: FC<Props> = (props: Props) => {

    const { filterValueState, paramsObjectsTranslate, setFilterValueState, setParamsObjectsTranslate } = props
    const [orderValueState, setOrderValueState] = useState<ValueState>(
        ValueState.None
    );
    const [orderValueStateMessage, setOrderValueStateMessage] = useState("");

    const onSelectedOrder = useCallback((order: string) => {
        console.log(order)
        setParamsObjectsTranslate({
            ...paramsObjectsTranslate,
            order: order
        })
    }, [])

    /**
     * Efecto que sincroniza los valueState de la orden entre el componente de orde y de los filtros.
     * Si paso una función que actualiza el state de los filtros en vez de hacerlo como esta hora no sirve,
     * porque el componente de orden no se estera del cambio.
     */
    useEffect(() => {
        // Si hay error quito la orden previa que pueda tener
        if (orderValueState == ValueState.Error) setParamsObjectsTranslate({
            ...paramsObjectsTranslate,
            order: ""
        })

        setFilterValueState({
            ...filterValueState,
            orderStateMessage: orderValueStateMessage,
            orderState: orderValueState
        })
    }, [orderValueState, orderValueStateMessage])


    return <SelectOrderContainer
        orderType={TYPE.WORKBENCH}
        showTasks={false}
        onSelectedOrder={onSelectedOrder}
        orderValueState={filterValueState.orderState}
        setOrderValueState={setOrderValueState}
        orderValueStateMessage={filterValueState.orderStateMessage}
        setOrderValueStateMessage={setOrderValueStateMessage}
        type={SelectorComponentType.combobox}
    />
}

export default FilterOrder