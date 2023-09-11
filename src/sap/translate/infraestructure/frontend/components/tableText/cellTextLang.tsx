import { FC } from "react";
import { Input, Ui5CustomEvent, InputDomRef } from "@ui5/webcomponents-react";
import ObjectText from "sap/translate/domain/entities/objectText";
import useObjectTextTable from "sap/translate/infraestructure/frontend/hooks/useObjectTextTable";

const CellTextLang: FC = (instance: any) => {
    const rowOriginal = instance.row.original;
    const column = instance.column;
    const { updateRowChanged } = useObjectTextTable();

    const handlerChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        let newValues = { ...rowOriginal };
        let value = event.target.value as string;

        newValues[column.id] = value

        updateRowChanged(newValues as ObjectText)

    };

    return (
        <Input
            value={rowOriginal[column.id]}
            maxlength={120}
            onChange={handlerChange}
        />
    );
};

export default CellTextLang;
