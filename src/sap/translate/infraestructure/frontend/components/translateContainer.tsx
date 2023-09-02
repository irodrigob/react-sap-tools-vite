import { FC, useEffect, useState } from "react";
import {
    DynamicPage,
    DynamicPageHeader,
} from "@ui5/webcomponents-react";
import { useAppSelector } from "shared/storage/useStore";
import useTranslate from "sap/translate/infraestructure/frontend/hooks/useTranslate";

export default function TranslateContainer() {
    const { systemSelected } = useAppSelector((state) => state.System);
    const { systemChanged } = useAppSelector(
        (state) => state.SAPGeneral
    );
    const { languages, selectableObjects, loadInitialData } = useTranslate()

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

            </DynamicPageHeader>
        }
        style={{
            paddingLeft: "0px",
            paddingRight: "0px",
        }}
    />)


}