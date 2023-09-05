import { FC, useEffect, useState } from "react";
import {
    Languages,
    SelectableObjects,
    ParamsObjectTranslate,
} from "sap/translate/infraestructure/types/translate";
import {
    FilterBar,
    FilterGroupItem,
    Ui5CustomEvent,
    MultiComboBoxDomRef,
    FlexBox,
} from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";
import useMessages, {
    MessageType,
} from "shared/infraestructure/hooks/useMessages";
import FilterOlang from "./filterOlang";
import FilterTlang from "./filterTlang";
import FilterObject from "./filterObject";

interface Props {
    languages: Languages;
    loadingLanguages: boolean;
    selectableObjects: SelectableObjects;
    loadingSelectableObjects: boolean;
    paramsObjectsTranslate: ParamsObjectTranslate;
    setParamsObjectsTranslate: (value: ParamsObjectTranslate) => void;
    originLanguage: string;
}
const FiltersTranslate: FC<Props> = (props: Props) => {
    const {
        languages,
        loadingLanguages,
        loadingSelectableObjects,
        paramsObjectsTranslate,
        selectableObjects,
        setParamsObjectsTranslate,
        originLanguage,
    } = props;
    const { getI18nText } = useTranslations();
    const { showMessage } = useMessages();

    /**
     * Evento que se dispara cuando cambian los valores de los filtros.
     * @param {object} e | Datos del evento de modificación
     */
    const onFilterChange = (
        e: Ui5CustomEvent<
            MultiComboBoxDomRef,
            {
                items: unknown[];
            }
        >
    ) => { };
    return (
        <FilterBar
            hideToolbar={true}
            style={{ marginBottom: "0.4rem", alignItems: "stretch" }}
            showGoOnFB
            showRestoreOnFB
            hideFilterConfiguration={false}
            onGo={(e) => {
                e.stopPropagation();
            }}
            onRestore={() => {
                setParamsObjectsTranslate({
                    depthRefs: 1,
                    object: "",
                    objectName: "",
                    oLang: originLanguage,
                    order: "",
                    tLang: [],
                });
            }}
        >

            <FilterGroupItem
                label={getI18nText("translate.filters.labelOriginLanguage")}
                required
                style={{ maxWidth: "15rem" }}
            >
                <>
                    <FilterOlang
                        languages={languages}
                        loadingLanguages={loadingLanguages}
                        paramsObjectsTranslate={paramsObjectsTranslate}
                        setParamsObjectsTranslate={setParamsObjectsTranslate}
                    />
                </>
            </FilterGroupItem>
            <FilterGroupItem
                label={getI18nText("translate.filters.labelTargetLanguage")}
                required
                style={{ maxWidth: "15rem" }}
            >
                <>
                    <FilterTlang
                        languages={languages}
                        loadingLanguages={loadingLanguages}
                        paramsObjectsTranslate={paramsObjectsTranslate}
                        setParamsObjectsTranslate={setParamsObjectsTranslate}
                    />
                </>
            </FilterGroupItem>
            <FilterGroupItem
                label={getI18nText("translate.filters.labelObject")}
                required
                style={{ maxWidth: "50rem" }}
            >
                <>
                    <FilterObject
                        loadingSelectableObjects={loadingLanguages}
                        paramsObjectsTranslate={paramsObjectsTranslate}
                        selectableObjects={selectableObjects}
                        setParamsObjectsTranslate={setParamsObjectsTranslate}
                    />
                </>
            </FilterGroupItem>

        </FilterBar>
    );
};

export default FiltersTranslate;
