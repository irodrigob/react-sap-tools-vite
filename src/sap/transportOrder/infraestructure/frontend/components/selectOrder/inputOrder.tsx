import { FC, useCallback, useEffect, useState } from "react";
import {
	Input,
	InputDomRef,
	Ui5CustomEvent,
	Popover,
	ValueState,
	Text,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";
import DropdownIcon from "shared/frontend/components/dropdownIcon";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import { InputSuggestionItemSelectEventDetail } from "@ui5/webcomponents/dist/Input.js";
import { OrdersData } from "sap/transportOrder/infraestructure/types/selectOrder";
import OrderSuggestionsItems from "./orderSuggestionsItems";
import OrdersList from "./ordersList";
import useSelectOrder from "sap/transportOrder/infraestructure/frontend/hooks/useSelectOrder";

interface Props {
	showTasks: boolean;
	onSelectedOrder: (order: string) => void;
	orderValueState?: ValueState;
	setOrderValueState?: (state: ValueState) => void;
	orderValueStateMessage?: string;
	setOrderValueStateMessage?: (message: string) => void;
}

const InputOrder: FC<Props> = (props: Props) => {
	const {
		showTasks,
		onSelectedOrder,
		orderValueState,
		setOrderValueState,
		orderValueStateMessage,
		setOrderValueStateMessage,
	} = props;
	const { getI18nText } = useTranslations();
	const { selectableOrders, selectedOrder } = useAppSelector(
		(state) => state.SAPTransportOrder
	);
	const { convertOrders2ListFormat } = useSelectOrder();
	const [ordersList, setOrdersList] = useState<OrdersData>([]);
	const [openList, setOpenList] = useState(false);

	const popoverSelectOrder = useCallback((order: string) => {
		// Si se selecciona la orden vía selector la orden existira y se quitan los posibles estados
		if (setOrderValueState) setOrderValueState(ValueState.None);
		if (setOrderValueStateMessage) setOrderValueStateMessage("");

		onSelectedOrder(order);
		setOpenList(false);
	}, []);

	const onChangeOrder = useCallback(
		(event: Ui5CustomEvent<InputDomRef, never>) => {
			// si se selecciona el valor desde el suggestion viene la orden y su descripcion.
			// Para validarlo tengo que separarlo y solo quedarme con la orden.
			let values = (event.target.value as string).split("-");
			let order = values[0].trim();
			if (ordersList.findIndex((row) => row.order == order) == -1) {
				if (setOrderValueState) setOrderValueState(ValueState.Error);
				if (setOrderValueStateMessage)
					setOrderValueStateMessage(
						getI18nText("transportOrder.selectOrder.orderNotExist", {
							order: order,
						})
					);
			} else {
				if (setOrderValueState) setOrderValueState(ValueState.None);
				if (setOrderValueStateMessage) setOrderValueStateMessage("");

				onSelectedOrder(order);
			}
		},
		[ordersList]
	);

	useEffect(() => {
		setOrdersList(convertOrders2ListFormat(selectableOrders, showTasks));
	}, [selectableOrders]);

	return (
		<>
			<Input
				id="inputOrderSelect"
				style={{ marginLeft: "1rem", width: "15rem" }}
				placeholder={getI18nText(
					"transportOrder.selectOrder.placeholderSelectOrder"
				)}
				showSuggestions={true}
				onSuggestionItemSelect={(
					event: Ui5CustomEvent<
						InputDomRef,
						InputSuggestionItemSelectEventDetail
					>
				) => {
					event.preventDefault();
					onSelectedOrder(event.detail.item.id as string);
				}}
				icon={
					<DropdownIcon
						openSystemList={openList}
						onClick={() => {
							setOpenList(!openList);
						}}
					/>
				}
				value={selectedOrder}
				valueState={orderValueState}
				valueStateMessage={<Text>{orderValueStateMessage}</Text>}
				onChange={(event: Ui5CustomEvent<InputDomRef, never>) => {
					event.preventDefault();
					onChangeOrder(event);
				}}
			>
				<OrderSuggestionsItems orders={ordersList} />
			</Input>
			<Popover
				opener="inputOrderSelect"
				open={openList}
				placementType="Right"
				onAfterClose={() => {
					setOpenList(false);
				}}
			>
				<OrdersList
					showTasks={showTasks}
					onSelectedOrder={popoverSelectOrder}
				/>
			</Popover>
		</>
	);
};

export default InputOrder;
