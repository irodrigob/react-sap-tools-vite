import { AnalyticalTable } from "@ui5/webcomponents-react";
import useObjectTextTable from "sap/translate/infraestructure/frontend/hooks/useObjectTextTable";
import { useAppSelector } from "shared/storage/useStore";
import ToolbarTable from "./toolbarTable";

export default function ObjectsTextTable() {
    const { objectsText } = useAppSelector(state => state.SAPTranslate)
    const { columnsObjectsText, setRowSelected, selectedObjectText } = useObjectTextTable();

    return (
        <>
            <AnalyticalTable
                style={{ marginLeft: "1rem" }}
                columns={columnsObjectsText}
                data={objectsText}
                visibleRowCountMode="Interactive"
                scaleWidthMode="Grow"
                selectionMode="MultiSelect"
                selectionBehavior="Row"
                header={<ToolbarTable selectedObjectText={selectedObjectText} objectsText={objectsText} />}
                onRowSelect={(event: any) => {
                    if (event.detail.row) {
                        setRowSelected([{ ...event.detail.row.original }]);
                    } else if (event.detail.selectedFlatRows) {
                        setRowSelected(event.detail.selectedFlatRows.map((row: any) => {
                            return row.original;
                        }))

                    }
                }}
            />
        </>
    );
};
