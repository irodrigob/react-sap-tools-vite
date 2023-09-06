import { FC, useState, useEffect } from "react";
import {
    ComboBox,
    ComboBoxItem,
    Ui5CustomEvent,
    ComboBoxDomRef,
    FlexBox,
    Input,
    InputDomRef,
    Text,
} from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";
import {
    SelectableObjects,
    ParamsObjectTranslate,
    FiltersValueState,
} from "sap/translate/infraestructure/types/translate";
import { ValueState } from "@ui5/webcomponents-react/ssr";
import TranslateController from "sap/translate/infraestructure/controller/translateController";
import ErrorGraphql from "shared/errors/ErrorGraphql";

interface Props {
    selectableObjects: SelectableObjects;
    loadingSelectableObjects: boolean;
    paramsObjectsTranslate: ParamsObjectTranslate;
    setParamsObjectsTranslate: (value: ParamsObjectTranslate) => void;
    filterValueState: FiltersValueState;
    setFilterValueState: (value: FiltersValueState) => void;
}

const FilterObject: FC<Props> = (props: Props) => {
    const {
        loadingSelectableObjects,
        paramsObjectsTranslate,
        selectableObjects,
        setParamsObjectsTranslate,
        filterValueState,
        setFilterValueState,
    } = props;
    const { getI18nText } = useTranslations();
    const [valueSelected, setValueSelected] = useState("");
    const translateController = new TranslateController();

    /**
     * Efecto que informa el objeto y nombre para que se vea en el combo
     */
    useEffect(() => {
        let objectFind = selectableObjects.find(
            (row) => row.object == paramsObjectsTranslate.object
        );
        if (objectFind)
            setValueSelected(`${objectFind.object} - ${objectFind.text}`);
    }, [paramsObjectsTranslate.object, selectableObjects]);

    useEffect(() => {
        if (
            paramsObjectsTranslate.object != "" &&
            paramsObjectsTranslate.objectName != ""
        ) {
            translateController
                .checkObject(
                    paramsObjectsTranslate.object,
                    paramsObjectsTranslate.objectName
                )
                .then((response) => {
                    if (response.isFailure) {
                        let error = (response.getErrorValue() as ErrorGraphql).getError();
                        setFilterValueState({
                            ...filterValueState,
                            objectState: ValueState.Error,
                            objectStateMessage: error.singleMessage as string
                        })
                    } else {
                        setFilterValueState({
                            ...filterValueState,
                            objectState: ValueState.None,
                            objectStateMessage: ""
                        })
                    }
                });
        } else {
            setFilterValueState({
                ...filterValueState,
                objectState: ValueState.None,
                objectStateMessage: ""
            })
        }
    }, [paramsObjectsTranslate.object, paramsObjectsTranslate.objectName]);
    return (
        <FlexBox direction="Row">
            <ComboBox
                filter="Contains"
                placeholder={getI18nText("translate.filters.placeholderObject")}
                onChange={(event: Ui5CustomEvent<ComboBoxDomRef, never>) => {
                    event.preventDefault();
                    let values = (event.target.value as string).split("-");
                    setParamsObjectsTranslate({
                        ...paramsObjectsTranslate,
                        object: values[0].trim(),
                    });
                }}
                loading={loadingSelectableObjects}
                value={valueSelected}
            >
                {selectableObjects.map((rowObject) => {
                    return (
                        <ComboBoxItem
                            text={`${rowObject.object} - ${rowObject.text}`}
                            additionalText={rowObject.pgmid}
                            key={rowObject.object}
                            id={rowObject.object}
                        />
                    );
                })}
            </ComboBox>
            <Input
                placeholder={getI18nText("translate.filters.placeholderObjectName")}
                style={{ marginLeft: "0.7rem", maxWidth: "15rem" }}
                onChange={(event: Ui5CustomEvent<InputDomRef, never>) => {
                    event.preventDefault();
                    setParamsObjectsTranslate({
                        ...paramsObjectsTranslate,
                        objectName: event.target.value?.toUpperCase() as string,
                    });
                }}
                value={paramsObjectsTranslate.objectName}
                valueState={filterValueState.objectState}
                valueStateMessage={<Text>{filterValueState.objectStateMessage}</Text>}
            />
        </FlexBox>
    );
};

export default FilterObject;
