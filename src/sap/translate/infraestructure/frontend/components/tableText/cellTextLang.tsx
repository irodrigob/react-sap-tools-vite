import { FC } from "react";
import { Input, Ui5CustomEvent, InputDomRef } from "@ui5/webcomponents-react";
import ObjectText from "sap/translate/domain/entities/objectText";
import useDataManager from "sap/translate/infraestructure/frontend/hooks/useDataManager";
import { COLOR_TEXT_PPSAL_TYPE, TEXT_PPSAL_TYPE } from "sap/translate/infraestructure/utils/constants/constantsTranslate";

const CellTextLang: FC = (instance: any) => {
    const rowOriginal = instance.row.original;
    const column = instance.column;
    const { determinePpsalTypeFromColumnId, updateColumnChanged } = useDataManager()

    var colorPpsalType = COLOR_TEXT_PPSAL_TYPE.WITHOUT_TEXT
    switch (rowOriginal[determinePpsalTypeFromColumnId(column.id)]) {
        case TEXT_PPSAL_TYPE.PPSAL_CONFIRMED:
            colorPpsalType = COLOR_TEXT_PPSAL_TYPE.PPSAL_CONFIRMED;
            break
        case TEXT_PPSAL_TYPE.PPSAL_WO_CONFIRM:
            colorPpsalType = COLOR_TEXT_PPSAL_TYPE.PPSAL_WO_CONFIRM;
            break
        case TEXT_PPSAL_TYPE.WITHOUT_TEXT:
            colorPpsalType = COLOR_TEXT_PPSAL_TYPE.WITHOUT_TEXT;
            break
        case TEXT_PPSAL_TYPE.CHANGED_TEXT:
            colorPpsalType = COLOR_TEXT_PPSAL_TYPE.CHANGED_TEXT;
            break
    }

    const handlerChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        updateColumnChanged(rowOriginal as ObjectText, column.id, event.target.value as string)

    };


    return (
        <Input
            value={rowOriginal[column.id]}
            maxlength={120}
            onChange={handlerChange}
            style={{ backgroundColor: colorPpsalType, color: "black" }}

        />
    );
};

export default CellTextLang;
