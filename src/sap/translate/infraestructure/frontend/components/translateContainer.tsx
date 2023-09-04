import { useEffect } from "react";
import { DynamicPage, DynamicPageHeader } from "@ui5/webcomponents-react";
import { useAppSelector } from "shared/storage/useStore";
import useTranslate from "sap/translate/infraestructure/frontend/hooks/useTranslate";
import FiltersTranslate from "./filters/filtersTranslate";

export default function TranslateContainer() {
    const { systemSelected } = useAppSelector((state) => state.System);
    const { systemChanged } = useAppSelector((state) => state.SAPGeneral);
    const {
        languages,
        selectableObjects,
        loadInitialData,
        loadingLanguages,
        loadingSelectableObjects,
        paramsObjectsTranslate,
        setParamsObjectsTranslate,
        originLanguage,
    } = useTranslate();

    useEffect(() => {
        if (systemSelected.name && systemChanged) {
            loadInitialData();
        }
    }, [systemSelected, systemChanged]);

    return (
        <DynamicPage
            showHideHeaderButton={true}
            headerContentPinnable={false}
            headerContent={
                <DynamicPageHeader>
                    <FiltersTranslate
                        languages={languages}
                        loadingLanguages={loadingLanguages}
                        loadingSelectableObjects={loadingSelectableObjects}
                        paramsObjectsTranslate={paramsObjectsTranslate}
                        selectableObjects={selectableObjects}
                        setParamsObjectsTranslate={setParamsObjectsTranslate}
                        originLanguage={originLanguage}
                    />
                </DynamicPageHeader>
            }
            style={{
                paddingLeft: "0px",
                paddingRight: "0px",
            }}
        />
    );
}
