import {
    ToolbarV2,
    ToolbarButton,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/save";
import "@ui5/webcomponents-icons/dist/shipping-status";
import {
    ObjectsText
} from "sap/translate/infraestructure/types/translate.d";
import useObjectTextTable from "sap/translate/infraestructure/frontend/hooks/useObjectTextTable";
import { useTranslations } from "translations/i18nContext";
import useToolbarTable from "sap/translate/infraestructure/frontend/hooks/useToolbarTable";
import { FC } from "react";

interface Props {
    selectedObjectText: ObjectsText
}
const ToolbarTable: FC<Props> = (props) => {
    const { selectedObjectText } = props
    const { saveObjectsText } = useObjectTextTable()
    const { getI18nText } = useTranslations()
    const { handlerAddObjects } = useToolbarTable()


    return (
        <ToolbarV2 alignContent="End">
            <ToolbarButton
                icon="shipping-status"
                tooltip={getI18nText("transportOrder.toolbarActionsTable.tooltipAddObjects")}
                onClick={handlerAddObjects(selectedObjectText)}
            />
            <ToolbarButton
                icon="save"
                onClick={saveObjectsText}
                tooltip={getI18nText("transportOrder.toolbarActionsTable.tooltipSave")}
            />
        </ToolbarV2>)

}

export default ToolbarTable