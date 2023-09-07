import { FC, useEffect, useState } from "react";
import {
    Languages,
    SelectableObjects,
    ParamsObjectTranslate,
    FiltersValueState,
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
import FilterOrder from "./filterOrder";
import { ValueState } from "@ui5/webcomponents-react/ssr";

interface Props {
    languages: Languages;
    loadingLanguages: boolean;
    selectableObjects: SelectableObjects;
    loadingSelectableObjects: boolean;
    paramsObjectsTranslate: ParamsObjectTranslate;
    setParamsObjectsTranslate: (value: ParamsObjectTranslate) => void;
    originLanguage: string;
    filterValueState: FiltersValueState;
    setFilterValueState: (value: FiltersValueState) => void;
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
        filterValueState,
        setFilterValueState,
    } = props;
    const { getI18nText } = useTranslations();
    const { showMessage } = useMessages();

    return (
        <FilterBar
            hideToolbar={true}
            style={{ marginBottom: "0.4rem", alignItems: "stretch" }}
            showGoOnFB
            showRestoreOnFB
            hideFilterConfiguration={true}
            onGo={(e) => {
                e.stopPropagation();
                if (
                    filterValueState.objectState == ValueState.Error ||
                    filterValueState.objectNameState == ValueState.Error ||
                    filterValueState.orderState == ValueState.Error ||
                    filterValueState.olangState == ValueState.Error ||
                    filterValueState.tlangState == ValueState.Error
                ) {
                    showMessage(
                        getI18nText("translate.filters.stillErrors"),
                        MessageType.warning
                    );
                } else {
                    if (paramsObjectsTranslate.tLang.length == 0) {
                        setFilterValueState({
                            ...filterValueState,
                            tlangState: ValueState.Error,
                            tlangStateMessage: getI18nText(
                                "translate.filters.fieldMandatory"
                            ),
                        });
                    } else {
                    }
                }
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
                        filterValueState={filterValueState}
                        setFilterValueState={setFilterValueState}
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
                        filterValueState={filterValueState}
                        setFilterValueState={setFilterValueState}
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
                        filterValueState={filterValueState}
                        setFilterValueState={setFilterValueState}
                    />
                </>
            </FilterGroupItem>
            <FilterGroupItem
                label={getI18nText("translate.filters.labelOrder")}
                style={{ maxWidth: "30rem" }}
            >
                <>
                    {languages.length > 0 && (
                        <FilterOrder
                            paramsObjectsTranslate={paramsObjectsTranslate}
                            setParamsObjectsTranslate={setParamsObjectsTranslate}
                            filterValueState={filterValueState}
                            setFilterValueState={setFilterValueState}
                        />
                    )}
                </>
            </FilterGroupItem>
        </FilterBar>
    );
};

export default FiltersTranslate;
