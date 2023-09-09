import { FC } from "react";
import { AnalyticalTable } from "@ui5/webcomponents-react";
import { ObjectsText } from "sap/translate/infraestructure/types/translate.d";
import { useTranslations } from "translations/i18nContext";
import useObjectTextTable from "sap/translate/infraestructure/frontend/hooks/useObjectTextTable";

interface Props {
    objectsText: ObjectsText;
    objectsTextOriginal: ObjectsText;
}

const ObjectsTextTable: FC<Props> = (props: Props) => {
    const {
        objectsText,
        objectsTextOriginal,
    } = props;
    const { columnsTable } = useObjectTextTable(objectsText);
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
export default ObjectsTextTable