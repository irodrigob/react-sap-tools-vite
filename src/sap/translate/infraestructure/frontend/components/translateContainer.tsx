import { FC, useEffect, useState } from "react";
import {
    DynamicPage,
    DynamicPageHeader,
} from "@ui5/webcomponents-react";
import { useAppSelector } from "shared/storage/useStore";
import useTranslate from "sap/translate/infraestructure/frontend/hooks/useTranslate";
import FiltersTranslate from "./filtersTranslate";
import { setSelectableOrders } from "sap/transportOrder/infraestructure/storage/sapTransportOrderSlice";

export default function TranslateContainer() {
    const { systemSelected } = useAppSelector((state) => state.System);
    const { systemChanged } = useAppSelector(
        (state) => state.SAPGeneral
    );
    const { languages, setLanguages, selectableObjects, setSelectableObjects, loadInitialData, loadingLanguages, loadingSelectableLanguages, paramsObjectsTranslate, setParamsObjectsTranslate } = useTranslate()

    useEffect(() => {
        if (systemSelected.name && systemChanged) {
            loadInitialData();
        }
    }, [systemSelected, systemChanged]);


    return (<DynamicPage
        showHideHeaderButton={true}
        headerContentPinnable={false}
        headerContent={
            <DynamicPageHeader>
                <FiltersTranslate languages={languages} loadingLanguages={loadingLanguages} loadingSelectableLanguages={loadingSelectableLanguages} paramsObjectsTranslate={paramsObjectsTranslate}
                    selectableObjects={selectableObjects} setLanguages={setLanguages} setParamsObjectsTranslate={setParamsObjectsTranslate} setSelectableObjects={setSelectableObjects} />
            </DynamicPageHeader>
        }
        style={{
            paddingLeft: "0px",
            paddingRight: "0px",
        }}
    />)


}