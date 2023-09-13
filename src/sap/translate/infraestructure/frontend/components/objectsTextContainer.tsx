import { FC } from "react";
import { Title } from "@ui5/webcomponents-react";
import { ObjectsText } from "sap/translate/infraestructure/types/translate.d";
import { useTranslations } from "translations/i18nContext";
import ObjectsTextTable from "./tableText/objectsTextTable";
import { useAppSelector } from "shared/storage/useStore";
interface Props {
    loadingObjectsText: boolean;
    loadObjectsText: boolean;
}

const ObjectsTextContainer: FC<Props> = (props: Props) => {
    const { loadingObjectsText, loadObjectsText } = props;
    const { getI18nText } = useTranslations();
    const { objectsText } = useAppSelector(state => state.SAPTranslate)

    return (
        <>
            {!loadObjectsText && !loadingObjectsText && (
                <Title
                    level="H2"
                    style={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "10rem",
                    }}
                >
                    {getI18nText("translate.objectsTextDataNotLoad")}
                </Title>
            )}
            {loadObjectsText && objectsText.length == 0 && !loadingObjectsText && (
                <Title
                    level="H2"
                    style={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "10rem",
                    }}
                >
                    {getI18nText("translate.noDataFound")}
                </Title>
            )}
            {loadingObjectsText && (<Title
                level="H2"
                style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "10rem",
                }}
            >
                {getI18nText("translate.loadingData")}
            </Title>)}
            {!loadingObjectsText && loadObjectsText && objectsText.length > 0 && (
                <ObjectsTextTable />
            )}
        </>
    );
};

export default ObjectsTextContainer;
