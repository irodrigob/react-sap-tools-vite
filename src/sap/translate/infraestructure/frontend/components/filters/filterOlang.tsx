import { FC, useEffect, useState } from "react";
import {
    ComboBox,
    ComboBoxItem,
    Ui5CustomEvent,
    ComboBoxDomRef,
    Text,
    ValueState,
} from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";
import {
    FiltersValueState,
    Languages,
    ParamsObjectTranslate,
} from "sap/translate/infraestructure/types/translate";

interface Props {
    languages: Languages;
    loadingLanguages: boolean;
    paramsObjectsTranslate: ParamsObjectTranslate;
    setParamsObjectsTranslate: (value: ParamsObjectTranslate) => void;
    filterValueState: FiltersValueState;
    setFilterValueState: (value: FiltersValueState) => void;
}
const FilterOlang: FC<Props> = (props: Props) => {
    const {
        languages,
        loadingLanguages,
        paramsObjectsTranslate,
        setParamsObjectsTranslate,
        filterValueState,
        setFilterValueState,
    } = props;
    const [valueSelected, setValueSelected] = useState("");
    const { getI18nText } = useTranslations();

    useEffect(() => {
        let languagefind = languages.find(
            (row) => row.language == paramsObjectsTranslate.oLang
        );
        if (languagefind)
            setValueSelected(
                `${languagefind.language} - ${languagefind.description}`
            );
    }, [paramsObjectsTranslate.oLang, languages]);

    return (
        <ComboBox
            filter="Contains"
            placeholder={getI18nText("translate.filters.placeholderOriginLanguage")}
            onChange={(event: Ui5CustomEvent<ComboBoxDomRef, never>) => {
                event.preventDefault();
                let olang = (event.target.value as string).split("-")[0].trim();
                if (olang == "") {
                    setFilterValueState({
                        ...filterValueState,
                        olangState: ValueState.Error,
                        olangStateMessage: getI18nText("translate.filters.fieldMandatory"),
                    });
                }
                else {
                    if (languages.findIndex(
                        (row) => row.language == olang
                    ) != -1) {
                        setFilterValueState({
                            ...filterValueState,
                            olangState: ValueState.None,
                            olangStateMessage: "",
                        });
                        setParamsObjectsTranslate({
                            ...paramsObjectsTranslate,
                            oLang: olang,
                        });



                    } else {
                        setFilterValueState({
                            ...filterValueState,
                            olangState: ValueState.Error,
                            olangStateMessage: getI18nText("translate.filters.valueNotValid"),
                        });
                    }
                }
            }}
            value={valueSelected}
            loading={loadingLanguages}
            valueState={filterValueState.olangState}
            valueStateMessage={<Text>{filterValueState.olangStateMessage}</Text>}
        >
            {languages.map((rowLanguage) => {
                return (
                    <ComboBoxItem
                        text={`${rowLanguage.language} - ${rowLanguage.description}`}
                        key={rowLanguage.language}
                        id={rowLanguage.language}
                    />
                );
            })}
        </ComboBox>
    );
};

export default FilterOlang;
