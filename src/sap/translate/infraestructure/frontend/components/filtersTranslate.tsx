import { FC } from "react"
import {
    Languages,
    SelectableObjects,
    ParamsObjectTranslate,
} from "sap/translate/infraestructure/types/translate";
import {
    FilterBar,
    FilterGroupItem,
    MultiComboBox,
    MultiComboBoxItem,
    ComboBox, ComboBoxItem,
    DatePicker,
    ValueState,
    Text,
    Ui5CustomEvent,
    MultiComboBoxDomRef,
} from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";
import useMessages, {
    MessageType,
} from "shared/infraestructure/hooks/useMessages";
import Language from "sap/translate/domain/entities/language";

interface Props {
    languages: Languages,
    setLanguages: (value: Languages) => void
    loadingLanguages: boolean,
    selectableObjects: SelectableObjects,
    setSelectableObjects: (value: SelectableObjects) => void,
    loadingSelectableLanguages: boolean,
    paramsObjectsTranslate: ParamsObjectTranslate,
    setParamsObjectsTranslate: (value: ParamsObjectTranslate) => void
}
const FiltersTranslate: FC<Props> = (props: Props) => {
    const { languages, loadingLanguages, loadingSelectableLanguages, paramsObjectsTranslate, selectableObjects, setLanguages, setParamsObjectsTranslate, setSelectableObjects } = props
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
    ) => {
    }
    return <FilterBar hideToolbar={true}
        style={{ marginBottom: "0.4rem" }}
        showGoOnFB
        showRestoreOnFB
        hideFilterConfiguration={false}
        onGo={(e) => {
            e.stopPropagation();
        }}
        onRestore={() => {
            //setParamsObjectsTranslate()
        }}>
        <FilterGroupItem
            active
            label={getI18nText("translate.filters.labelOriginLanguage")}
            required
        >
            <ComboBox filter="Contains" placeholder={getI18nText("translate.filters.labelOriginLanguage")}>
                {languages.map((language: Language) => {
                    return <ComboBoxItem text={language.language} />

                })}
            </ComboBox>
        </FilterGroupItem>
    </FilterBar>
}

export default FiltersTranslate
