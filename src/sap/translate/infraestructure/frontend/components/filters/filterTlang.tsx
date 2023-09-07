import { FC, useEffect } from "react";
import {
    MultiComboBox,
    MultiComboBoxItem,
    MultiComboBoxDomRef,
    Ui5CustomEvent,
    ValueState,
    Text,
} from "@ui5/webcomponents-react";
import {
    FiltersValueState,
    Languages,
    ParamsObjectTranslate,
    SelectableObjects,
} from "sap/translate/infraestructure/types/translate";
import { useTranslations } from "translations/i18nContext";
import { MultiComboBoxSelectionChangeEventDetail } from "@ui5/webcomponents/dist/MultiComboBox.js";

interface Props {
    languages: Languages;
    loadingLanguages: boolean;
    paramsObjectsTranslate: ParamsObjectTranslate;
    setParamsObjectsTranslate: (value: ParamsObjectTranslate) => void;
    filterValueState: FiltersValueState;
    setFilterValueState: (value: FiltersValueState) => void;
}

const FilterTlang: FC<Props> = (props: Props) => {
    const {
        loadingLanguages,
        paramsObjectsTranslate,
        setParamsObjectsTranslate,
        languages,
        filterValueState,
        setFilterValueState
    } = props;
    const { getI18nText } = useTranslations();

    /**
     * Efecto que elimina el idioma de origen en el array de idioma de destino
     */
    useEffect(() => {
        if (paramsObjectsTranslate.tLang.findIndex(row => row == paramsObjectsTranslate.oLang) != -1)
            setParamsObjectsTranslate({
                ...paramsObjectsTranslate,
                tLang: paramsObjectsTranslate.tLang.filter(row => row != paramsObjectsTranslate.oLang)
            })
    }, [paramsObjectsTranslate.oLang, paramsObjectsTranslate.tLang])

    return (
        <MultiComboBox
            onSelectionChange={(
                event: Ui5CustomEvent<
                    MultiComboBoxDomRef,
                    MultiComboBoxSelectionChangeEventDetail
                >
            ) => {
                setParamsObjectsTranslate({
                    ...paramsObjectsTranslate,
                    tLang: event.detail.items.map((item) => {
                        return item.id;
                    }),
                });
                if (event.detail.items.length == 0)
                    setFilterValueState({
                        ...filterValueState,
                        tlangState: ValueState.Error,
                        tlangStateMessage: getI18nText("translate.filters.fieldMandatory"),
                    });
                else
                    setFilterValueState({
                        ...filterValueState,
                        tlangState: ValueState.None,
                        tlangStateMessage: "",
                    });
            }}
            style={{ maxWidth: "15rem" }}
            valueState={filterValueState.tlangState}
            valueStateMessage={<Text>{filterValueState.tlangStateMessage}</Text>}
        >
            {languages
                .filter(
                    (rowLanguage) => rowLanguage.language != paramsObjectsTranslate.oLang
                )
                .map((rowLanguage) => {
                    return (
                        <MultiComboBoxItem
                            text={`${rowLanguage.language} - ${rowLanguage.description}`}
                            key={rowLanguage.language}
                            id={rowLanguage.language}
                        />
                    );
                })}
        </MultiComboBox>
    );
};

export default FilterTlang;
