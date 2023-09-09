import { FC } from "react";
import { Title } from "@ui5/webcomponents-react";
import { ObjectsText } from "sap/translate/infraestructure/types/translate.d";
import { useTranslations } from "translations/i18nContext";
import ObjectsTextTable from "./objectsTextTable";

interface Props {
    objectsText: ObjectsText;
    loadingObjectsText: boolean;
    loadObjectsText: boolean;
    objectsTextOriginal: ObjectsText;
}

const ObjectsTextContainer: FC<Props> = (props: Props) => {
    const { loadingObjectsText, objectsText, loadObjectsText, objectsTextOriginal } = props;
    const { getI18nText } = useTranslations();

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
            {loadObjectsText && objectsText.length > 0 && (
                <ObjectsTextTable
                    objectsText={objectsText}
                    objectsTextOriginal={objectsTextOriginal}
                />
            )}
        </>
    );
};

export default ObjectsTextContainer;
