import { useEffect } from "react";
import { DynamicPage, DynamicPageHeader } from "@ui5/webcomponents-react";
import { useAppSelector } from "shared/storage/useStore";
import useTranslate from "sap/translate/infraestructure/frontend/hooks/useTranslate";
import FiltersTranslate from "./filters/filtersTranslate";
import ObjectsTextContainer from "./objectsTextContainer";
import { APP } from "sap/translate/infraestructure/utils/constants/constantsTranslate";

export default function TranslateContainer() {
    const { systemSelected } = useAppSelector((state) => state.System);
    const { systemChanged, applicationChanged } = useAppSelector((state) => state.SAPGeneral);
    const {
        languages,
        selectableObjects,
        loadInitialData,
        loadingLanguages,
        loadingSelectableObjects,
        originLanguage,
        getObjectTranslate,
        loadingObjectsText,
        loadObjectsText,
        setLoadObjectsText,
    } = useTranslate();

    useEffect(() => {
        if (systemSelected.name && (systemChanged || applicationChanged)) {
            loadInitialData();
        }
    }, [systemSelected, systemChanged, applicationChanged]);

    return (
        <>
            <DynamicPage
                showHideHeaderButton={true}
                headerContentPinnable={false}
                headerContent={
                    <DynamicPageHeader>
                        <FiltersTranslate
                            languages={languages}
                            loadingLanguages={loadingLanguages}
                            loadingSelectableObjects={loadingSelectableObjects}
                            selectableObjects={selectableObjects}
                            originLanguage={originLanguage}
                            onGo={() => {
                                setLoadObjectsText(true)
                                getObjectTranslate()
                            }}
                        />
                    </DynamicPageHeader>
                }
                style={{
                    paddingLeft: "0px",
                    paddingRight: "0px",
                }}
            />
            <ObjectsTextContainer loadObjectsText={loadObjectsText}
                loadingObjectsText={loadingObjectsText}
            />
        </>
    );
}
