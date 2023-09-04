import { FC, useEffect } from "react";
import {
    MultiComboBox,
    MultiComboBoxItem,
    MultiComboBoxDomRef,
    Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import {
    Languages,
    ParamsObjectTranslate,
    SelectableObjects,
} from "sap/translate/infraestructure/types/translate";
import { MultiComboBoxSelectionChangeEventDetail } from "@ui5/webcomponents/dist/MultiComboBox.js";

interface Props {
    languages: Languages;
    loadingLanguages: boolean;
    paramsObjectsTranslate: ParamsObjectTranslate;
    setParamsObjectsTranslate: (value: ParamsObjectTranslate) => void;
}

const FilterTlang: FC<Props> = (props: Props) => {
    const {
        loadingLanguages,
        paramsObjectsTranslate,
        setParamsObjectsTranslate,
        languages,
    } = props;

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
            }}
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
