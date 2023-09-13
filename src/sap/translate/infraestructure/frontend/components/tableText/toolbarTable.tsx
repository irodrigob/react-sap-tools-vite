import {
    ToolbarV2,
    ToolbarButton,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/save";
import useObjectTextTable from "sap/translate/infraestructure/frontend/hooks/useObjectTextTable";

export default function ToolbarTable() {
    const { saveObjectsText } = useObjectTextTable()

    return (
        <ToolbarV2 alignContent="End">
            <ToolbarButton
                icon="save"
                onClick={saveObjectsText}
            />
        </ToolbarV2>)

}