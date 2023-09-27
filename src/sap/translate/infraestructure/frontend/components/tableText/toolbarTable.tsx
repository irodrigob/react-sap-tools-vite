import {
    ToolbarV2,
    ToolbarButton,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/save";
import "@ui5/webcomponents-icons/dist/shipping-status";
import "@ui5/webcomponents-icons/dist/download";
import {
    ObjectsText
} from "sap/translate/infraestructure/types/translate.d";
import { useTranslations } from "translations/i18nContext";
import useToolbarTable from "sap/translate/infraestructure/frontend/hooks/useToolbarTable";
import { FC } from "react";

interface Props {
    selectedObjectText: ObjectsText
}
const ToolbarTable: FC<Props> = (props) => {
    const { selectedObjectText } = props
    const { getI18nText } = useTranslations()
    const { handlerAddObjects, handlerSaveObjectsText } = useToolbarTable()

    /*
    <ToolbarButton
                    icon="download"
                    tooltip={getI18nText("transportOrder.toolbarActionsTable.tooltipDownloadTexts")}
                />
    
    */
    return (
        <ToolbarV2 alignContent="End">

            <ToolbarButton
                icon="shipping-status"
                tooltip={getI18nText("transportOrder.toolbarActionsTable.tooltipAddObjects")}
                onClick={handlerAddObjects(selectedObjectText)}
            />
            <ToolbarButton
                icon="save"
                onClick={handlerSaveObjectsText}
                tooltip={getI18nText("transportOrder.toolbarActionsTable.tooltipSave")}
            />
        </ToolbarV2>)

}

export default ToolbarTable