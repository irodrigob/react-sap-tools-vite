import { FC, useEffect, useState } from "react";
import {
    Languages,
    SelectableObjects,
    FiltersValueState,
} from "sap/translate/infraestructure/types/translate";
import {
    FilterBar,
    FilterGroupItem,
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
import FilterDepthRef from "./filterDepthRef";
import { useAppSelector } from "shared/storage/useStore";
import SAPTranslateActions from "sap/translate/infraestructure/storage/sapTranslateActions";
import { INIT_PARAMS_OBJECT_TRANSLATE } from "sap/translate/infraestructure/utils/initValues";

interface Props {
    languages: Languages;
    loadingLanguages: boolean;
    selectableObjects: SelectableObjects;
    loadingSelectableObjects: boolean;
    originLanguage: string;
    onGo: () => void
}
const FiltersTranslate: FC<Props> = (props: Props) => {
    const {
        languages,
        loadingLanguages,
        selectableObjects,
        onGo
    } = props;
    const { paramsObjectsTranslate } = useAppSelector(
        (state) => state.SAPTranslate
    );
    const [filterValueState, setFilterValueState] = useState<FiltersValueState>({
        objectState: ValueState.None,
        objectStateMessage: "",
        objectNameState: ValueState.None,
        objectNameStateMessage: "",
        orderState: ValueState.None,
        orderStateMessage: "",
        olangState: ValueState.None,
        olangStateMessage: "",
        tlangState: ValueState.None,
        tlangStateMessage: "",
        depthRef: ValueState.None,
        depthRefMessage: "",
    });
    const { getI18nText } = useTranslations();
    const { showMessage } = useMessages();
    const sapTranslateActions = new SAPTranslateActions();

    return (
        <FilterBar
            hideToolbar={true}
            style={{ marginBottom: "0.4rem", alignItems: "stretch" }}
            showGoOnFB
            showRestoreOnFB
            hideFilterConfiguration={true}
            onGo={(e) => {
                e.stopPropagation();

                let newFilterValueState = { ...filterValueState }

                // Tiene que haber idioma destino
                if (paramsObjectsTranslate.tLang.length == 0) {
                    newFilterValueState.tlangState = ValueState.Error;
                    newFilterValueState.tlangStateMessage = getI18nText(
                        "translate.filters.fieldMandatory"
                    )
                }

                // Tiene que haber objeto y nombre del objeto informado
                if (paramsObjectsTranslate.object == "") {
                    newFilterValueState.objectState = ValueState.Error,
                        newFilterValueState.objectStateMessage = getI18nText(
                            "translate.filters.fieldMandatory"
                        )
                }


                if (paramsObjectsTranslate.objectName == "") {
                    newFilterValueState.objectNameState = ValueState.Error
                    newFilterValueState.objectNameStateMessage = getI18nText(
                        "translate.filters.fieldMandatory"
                    )
                }
                if (
                    newFilterValueState.objectState == ValueState.Error ||
                    newFilterValueState.objectNameState == ValueState.Error ||
                    newFilterValueState.orderState == ValueState.Error ||
                    newFilterValueState.olangState == ValueState.Error ||
                    newFilterValueState.tlangState == ValueState.Error
                ) {
                    showMessage(
                        getI18nText("translate.filters.stillErrors"),
                        MessageType.warning
                    )
                }
                else {
                    onGo()
                }
                setFilterValueState(newFilterValueState)


            }
            }
            onRestore={() => {
                sapTranslateActions.setParamsObjectsTranslate(INIT_PARAMS_OBJECT_TRANSLATE);
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
                        filterValueState={filterValueState}
                        setFilterValueState={setFilterValueState}
                    />
                </>
            </FilterGroupItem>
            <FilterGroupItem
                label={getI18nText("translate.filters.labelObject")}
                required
                style={{ minWidth: "30rem" }}
            >
                <>
                    <FilterObject
                        loadingSelectableObjects={loadingLanguages}
                        selectableObjects={selectableObjects}
                        filterValueState={filterValueState}
                        setFilterValueState={setFilterValueState}
                    />
                </>
            </FilterGroupItem>
            <FilterGroupItem
                label={getI18nText("translate.filters.labelOrder")}
                style={{ minWidth: "30rem" }}
            >
                <>
                    {languages.length > 0 && (
                        <FilterOrder
                            filterValueState={filterValueState}
                            setFilterValueState={setFilterValueState}
                        />
                    )}
                </>
            </FilterGroupItem>
            <FilterGroupItem
                label={getI18nText("translate.filters.labelDepthRef")}
                style={{ maxWidth: "15rem" }}
            >
                <>
                    <FilterDepthRef filterValueState={filterValueState}
                        setFilterValueState={setFilterValueState} />
                </>
            </FilterGroupItem>
        </FilterBar>
    );
};

export default FiltersTranslate;
