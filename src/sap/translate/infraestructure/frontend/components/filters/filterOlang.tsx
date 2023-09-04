import { FC, useEffect, useState } from "react";
import {
    ComboBox,
    ComboBoxItem,
    Ui5CustomEvent,
    ComboBoxDomRef,
} from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";
import { Languages, ParamsObjectTranslate, } from "sap/translate/infraestructure/types/translate";

interface Props {
    languages: Languages;
    loadingLanguages: boolean;
    paramsObjectsTranslate: ParamsObjectTranslate;
    setParamsObjectsTranslate: (value: ParamsObjectTranslate) => void;
}
const FilterOlang: FC<Props> = (props: Props) => {
    const { languages, loadingLanguages, paramsObjectsTranslate, setParamsObjectsTranslate } = props
    const [valueSelected, setValueSelected] = useState("")
    const { getI18nText } = useTranslations()

    useEffect(() => {
        let languagefind = languages.find(row => row.language == paramsObjectsTranslate.oLang)
        if (languagefind)
            setValueSelected(`${languagefind.language} - ${languagefind.description}`)
    }, [paramsObjectsTranslate.oLang, languages])

    return (<ComboBox
        filter="Contains"
        placeholder={getI18nText("translate.filters.placeholderOriginLanguage")}
        onChange={(event: Ui5CustomEvent<ComboBoxDomRef, never>) => {
            event.preventDefault();
            let values = (event.target.value as string).split("-");
            setParamsObjectsTranslate({ ...paramsObjectsTranslate, oLang: values[0].trim() })
        }}
        value={valueSelected}
        loading={loadingLanguages}
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
    </ComboBox>)
}

export default FilterOlang