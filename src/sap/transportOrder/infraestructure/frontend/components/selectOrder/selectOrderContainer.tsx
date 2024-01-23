import { FC, useEffect } from "react";
import { ValueState } from "@ui5/webcomponents-react";
import useSelectOrder from "sap/transportOrder/infraestructure/frontend/hooks/useSelectOrder";
import InputWithTitleOrder from "./inputWithTitleOrder";
import InputOrder from "./inputOrder";
import { SelectorComponentType } from "sap/transportOrder/infraestructure/types/selectOrder.d";
import ComboOrder from "./comboOrder";
import useSAPTransportOrderStore from "sap/transportOrder/infraestructure/frontend/hooks/useSAPTransportOrderStore";

interface Props {
	orderType: string;
	showTasks: boolean;
	onSelectedOrder: (order: string) => void;
	orderValueState?: ValueState;
	setOrderValueState?: (state: ValueState) => void;
	orderValueStateMessage?: string;
	setOrderValueStateMessage?: (message: string) => void;
	showTitle?: boolean;
	type?: SelectorComponentType;
}
const SelectOrderContainer: FC<Props> = (props: Props) => {
	const {
		orderType,
		showTasks,
		onSelectedOrder,
		orderValueState,
		setOrderValueState,
		orderValueStateMessage,
		setOrderValueStateMessage,
		showTitle,
		type,
	} = props;
	const componentType = type ?? SelectorComponentType.inputWithTitle;
	const { getOrders } = useSelectOrder();
	const { setSelectedOrderAction } = useSAPTransportOrderStore();

	useEffect(() => {
		if (orderType != "") {
			getOrders(orderType);
			setSelectedOrderAction("");
		}
	}, [orderType]);

	/**
	 * Gestiona cuando se selecciona una orden o tarea
	 * @param order | Orden/Tarea
	 */
	const handlerSelectedOrder = (order: string) => {
		setSelectedOrderAction(order);
		onSelectedOrder(order);
	};

	return (
		<>
			{componentType == SelectorComponentType.inputWithTitle && (
				<InputWithTitleOrder
					showTasks={showTasks}
					onSelectedOrder={handlerSelectedOrder}
					orderValueState={orderValueState}
					setOrderValueState={setOrderValueState}
					orderValueStateMessage={orderValueStateMessage}
					setOrderValueStateMessage={setOrderValueStateMessage}
				/>
			)}
			{componentType == SelectorComponentType.input && (
				<InputOrder
					showTasks={showTasks}
					onSelectedOrder={handlerSelectedOrder}
					orderValueState={orderValueState}
					setOrderValueState={setOrderValueState}
					orderValueStateMessage={orderValueStateMessage}
					setOrderValueStateMessage={setOrderValueStateMessage}
				/>
			)}
			{componentType == SelectorComponentType.combobox && (
				<ComboOrder
					showTasks={showTasks}
					onSelectedOrder={handlerSelectedOrder}
					orderValueState={orderValueState}
					setOrderValueState={setOrderValueState}
					orderValueStateMessage={orderValueStateMessage}
					setOrderValueStateMessage={setOrderValueStateMessage}
				/>
			)}
		</>
	);
};

export default SelectOrderContainer;
