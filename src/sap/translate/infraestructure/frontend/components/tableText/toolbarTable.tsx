import {
    ToolbarV2,
    ToolbarButton,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/save";
import "@ui5/webcomponents-icons/dist/shipping-status";
import useObjectTextTable from "sap/translate/infraestructure/frontend/hooks/useObjectTextTable";
import { useTranslations } from "translations/i18nContext";

export default function ToolbarTable() {
    const { saveObjectsText } = useObjectTextTable()
    const { getI18nText } = useTranslations()

    return (
        <ToolbarV2 alignContent="End">
            <ToolbarButton
                icon="shipping-status"
                tooltip={getI18nText("transportOrder.toolbarActionsTable.tooltipAddObjects")}
            />
            <ToolbarButton
                icon="save"
                onClick={saveObjectsText}
                tooltip={getI18nText("transportOrder.toolbarActionsTable.tooltipSave")}
            />
        </ToolbarV2>)

}