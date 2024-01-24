import { FC, useCallback, useEffect, useState } from "react";
import {
	SelectableObjects,
	ParamsObjectTranslate,
	FiltersValueState,
} from "sap/translate/infraestructure/types/translate";
import { ValueState } from "@ui5/webcomponents-react/ssr";
import SAPTranslateController from "sap/translate/infraestructure/controller/sapTranslateController";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import SelectOrderContainer from "sap/transportOrder/infraestructure/frontend/components/selectOrder/selectOrderContainer";
import { TYPE } from "sap/transportOrder/infraestructure/utils/constants/constantsTransportOrder";
import { SelectorComponentType } from "sap/transportOrder/infraestructure/types/selectOrder.d";
import useSAPTranslateStore from "sap/translate/infraestructure/frontend/hooks/useSAPTranslateStore";
import { useAppSelector } from "shared/storage/useStore";
import useSAPGeneral from "sap/general/infraestructure/frontend/hooks/useSAPGeneral";
import { APP } from "sap/translate/infraestructure/utils/constants/constantsTranslate";

interface Props {
	filterValueState: FiltersValueState;
	setFilterValueState: (value: FiltersValueState) => void;
}

const FilterOrder: FC<Props> = (props: Props) => {
	const { filterValueState, setFilterValueState } = props;
	const { paramsObjectsTranslate } = useAppSelector(
		(state) => state.SAPTranslate
	);
	const [selectedOrder, setSelectedOrder] = useState("");
	const { setParamsObjectsTranslateAction } = useSAPTranslateStore();
	const [orderValueState, setOrderValueState] = useState<ValueState>(
		ValueState.None
	);
	const [orderValueStateMessage, setOrderValueStateMessage] = useState("");
	const translateController = new SAPTranslateController();
	const { getDataForConnection } = useSAPGeneral();

	const onSelectedOrder = useCallback((orderSelected: string) => {
		setSelectedOrder(orderSelected);
		translateController
			.checkOrder(getDataForConnection(APP), orderSelected)
			.then((response) => {
				if (response.isFailure) {
					let error = (response.getErrorValue() as ErrorGraphql).getError();
					setOrderValueState(ValueState.Error);
					setOrderValueStateMessage(error.singleMessage as string);
				} else {
					setOrderValueState(ValueState.None);
					setOrderValueStateMessage("");
				}
			});
	}, []);

	/**
	 * Efecto que sincroniza los valueState de la orden entre el componente de orden y de los filtros.
	 * Si paso una función que actualiza el state de los filtros en vez de hacerlo como esta hora no sirve,
	 * porque el componente de orden no se estera del cambio.
	 * Además guarda la orden seleccionada si no hay errores.
	 */
	useEffect(() => {
		let orderTemp = selectedOrder;
		// Si hay error quito la orden previa que pueda tener
		if (orderValueState == ValueState.Error) orderTemp = "";

		setParamsObjectsTranslateAction({
			...paramsObjectsTranslate,
			order: orderTemp,
		});

		setFilterValueState({
			...filterValueState,
			orderStateMessage: orderValueStateMessage,
			orderState: orderValueState,
		});
	}, [orderValueState, orderValueStateMessage, selectedOrder]);

	return (
		<SelectOrderContainer
			orderType={TYPE.WORKBENCH}
			showTasks={false}
			onSelectedOrder={onSelectedOrder}
			orderValueState={filterValueState.orderState}
			setOrderValueState={setOrderValueState}
			orderValueStateMessage={filterValueState.orderStateMessage}
			setOrderValueStateMessage={setOrderValueStateMessage}
			type={SelectorComponentType.combobox}
		/>
	);
};

export default FilterOrder;
