import { FC } from "react";
import { AnalyticalTable } from "@ui5/webcomponents-react";
import { ObjectsText } from "sap/translate/infraestructure/types/translate.d";
import { useTranslations } from "translations/i18nContext";
import useObjectTextTable from "sap/translate/infraestructure/frontend/hooks/useObjectTextTable";
import { useAppSelector } from "shared/storage/useStore";

export default function ObjectsTextTable() {
    const { objectsText } = useAppSelector(state => state.SAPTranslate)
    const { columnsTable } = useObjectTextTable();
    const { getI18nText } = useTranslations();

    return (
        <>
            <AnalyticalTable
                style={{ marginLeft: "1rem" }}
                columns={columnsTable}
                data={objectsText}
                visibleRowCountMode="Auto"
                scaleWidthMode="Grow"
            />
        </>
    );
};
