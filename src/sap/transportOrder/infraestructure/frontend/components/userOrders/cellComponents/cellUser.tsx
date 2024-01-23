import {
	Label,
	ValueState,
	Text,
	ComboBox,
	ComboBoxItem,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";
import {
	FieldsOrdersTreeTable,
	FieldsTaskTreeTable,
} from "sap/transportOrder/infraestructure/types/transport";
import useCellValidations from "sap/transportOrder/infraestructure/frontend/hooks/useCellValidations";
import { useAppSelector } from "shared/storage/useStore";
import useSAPTransportOrderStore from "sap/transportOrder/infraestructure/frontend/hooks/useSAPTransportOrderStore";

const CellUser = (instance: any) => {
	const { userValidation } = useCellValidations();
	const { rowDataForUpdate, systemUsers } = useAppSelector(
		(state) => state.SAPTransportOrder
	);
	const rowOriginal: FieldsOrdersTreeTable | FieldsTaskTreeTable =
		instance.row.original;
	const editField = rowOriginal.user_edit && rowOriginal.row_editing;
	const { setRowDataForUpdateAction } = useSAPTransportOrderStore();

	const handlerChange = (value: string) => {
		let newValues = { ...rowDataForUpdate };

		let returnValidations = userValidation(value);

		newValues.user_error = returnValidations.error;
		newValues.user_message = returnValidations.message;
		if (!returnValidations.error)
			newValues.user = returnValidations.user as string;

		setRowDataForUpdateAction(newValues);
	};

	return (
		<>
			{!editField && (
				<Label style={{ color: "var(--sapList_TextColor)" }}>
					{rowOriginal.user}
				</Label>
			)}
			{editField && (
				<ComboBox
					value={rowOriginal.user}
					onSelectionChange={(e) => {
						e.preventDefault();
					}}
					onChange={(e) => {
						e.preventDefault();
						handlerChange(e.target.value as string);
					}}
					valueState={
						rowDataForUpdate.user_error ? ValueState.Error : ValueState.None
					}
					valueStateMessage={<Text>{rowDataForUpdate.user_message}</Text>}
				>
					{systemUsers.map((row) => {
						return (
							<ComboBoxItem
								text={row.userDesc}
								additionalText={row.user}
								key={row.user}
								id={row.user}
								data-key={row.user}
								data-id={row.user}
							/>
						);
					})}
				</ComboBox>
			)}
		</>
	);
};

export default CellUser;
