import { Text } from "@ui5/webcomponents-react";
import { FC } from "react";
import { ObjectsText } from "sap/translate/infraestructure/types/translate.d";
import { useTranslations } from "translations/i18nContext";

interface Props {
    objectsText: ObjectsText;
    loadingObjectsText: boolean;
    loadObjectsText: boolean;
}

const ObjectsTextContainer: FC<Props> = (props: Props) => {
    const { loadingObjectsText, objectsText, loadObjectsText } = props;
    const { getI18nText } = useTranslations();

    return (
        <>
            {!loadObjectsText && (
                <Text
                    style={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "10rem"
                    }}
                >
                    {getI18nText("translate.objectsTextDataNotLoad")}
                </Text>
            )}
        </>
    );
};

export default ObjectsTextContainer;
