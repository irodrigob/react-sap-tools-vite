import {
  Label,
  Input,
  Ui5CustomEvent,
  InputDomRef,
  ValueState,
  Text,
} from "@ui5/webcomponents-react";
import {
  FieldsOrdersTreeTable,
  FieldsTaskTreeTable,
} from "sap/transportOrder/infraestructure/types/transport";
import useCellValidations from "sap/transportOrder/infraestructure/frontend/hooks/useCellValidations";
import { useAppSelector } from "shared/storage/useStore";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";

const CellDescription = (instance: any) => {
  const { generalDataValidation } = useCellValidations();
  const { rowDataForUpdate } = useAppSelector(
    (state) => state.SAPTransportOrder
  );
  const rowOriginal: FieldsOrdersTreeTable | FieldsTaskTreeTable =
    instance.row.original;
  const editField = rowOriginal.description_edit && rowOriginal.row_editing;
  const sapTransportOrderActions = new SAPTransportOrderActions();

  const handlerChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
    let newValues = { ...rowDataForUpdate };

    let value = event.target.value as string;
    let returnValidations = generalDataValidation(value);

    newValues.description_error = returnValidations.error;
    newValues.description_message = returnValidations.message;
    if (!returnValidations.error) newValues.description = value;

    sapTransportOrderActions.setRowDataForUpdate(newValues);
  };

  return (
    <>
      {!editField && <Label style={{ color: "var(--sapList_TextColor)" }}>{rowOriginal.description}</Label>}
      {editField && (
        <Input
          value={rowOriginal.description}
          onChange={handlerChange}
          valueState={
            rowDataForUpdate.description_error
              ? ValueState.Error
              : ValueState.None
          }
          valueStateMessage={
            <Text>{rowDataForUpdate.description_message}</Text>
          }
        />
      )}
    </>
  );
};

export default CellDescription;
