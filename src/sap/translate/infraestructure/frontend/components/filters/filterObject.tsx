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
	ValueState,
} from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";
import {
	SelectableObjects,
	FiltersValueState,
} from "sap/translate/infraestructure/types/translate";
import SAPTranslateController from "sap/translate/infraestructure/controller/sapTranslateController";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { useAppSelector } from "shared/storage/useStore";
import useSAPTranslateStore from "sap/translate/infraestructure/frontend/hooks/useSAPTranslateStore";

interface Props {
	selectableObjects: SelectableObjects;
	loadingSelectableObjects: boolean;
	filterValueState: FiltersValueState;
	setFilterValueState: (value: FiltersValueState) => void;
}

const FilterObject: FC<Props> = (props: Props) => {
	const {
		loadingSelectableObjects,
		selectableObjects,
		filterValueState,
		setFilterValueState,
	} = props;
	const { paramsObjectsTranslate } = useAppSelector(
		(state) => state.SAPTranslate
	);
	const { setParamsObjectsTranslateAction } = useSAPTranslateStore();
	const { getI18nText } = useTranslations();
	const [valueSelected, setValueSelected] = useState("");
	const translateController = new SAPTranslateController();

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
							objectNameState: ValueState.Error,
							objectNameStateMessage: error.singleMessage as string,
						});
					} else {
						setFilterValueState({
							...filterValueState,
							objectNameState: ValueState.None,
							objectNameStateMessage: "",
						});
					}
				});
		}
	}, [paramsObjectsTranslate.object, paramsObjectsTranslate.objectName]);
	return (
		<FlexBox direction="Row">
			<ComboBox
				filter="Contains"
				placeholder={getI18nText("translate.filters.placeholderObject")}
				onChange={(event: Ui5CustomEvent<ComboBoxDomRef, never>) => {
					event.preventDefault();
					let object = (event.target.value as string).split("-")[0].trim();
					if (object == "") {
						setFilterValueState({
							...filterValueState,
							objectState: ValueState.Error,
							objectStateMessage: getI18nText(
								"translate.filters.fieldMandatory"
							),
						});
					} else {
						if (
							selectableObjects.findIndex((row) => row.object == object) != -1
						) {
							setParamsObjectsTranslateAction({
								...paramsObjectsTranslate,
								object: object,
							});
							setFilterValueState({
								...filterValueState,
								objectState: ValueState.None,
								objectStateMessage: "",
							});
						} else {
							setFilterValueState({
								...filterValueState,
								objectState: ValueState.Error,
								objectStateMessage: getI18nText(
									"translate.filters.valueNotValid"
								),
							});
						}
					}
				}}
				loading={loadingSelectableObjects}
				value={valueSelected}
				valueState={filterValueState.objectState}
				valueStateMessage={<Text>{filterValueState.objectStateMessage}</Text>}
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
				style={{ marginLeft: "0.7rem", maxWidth: "25rem" }}
				onChange={(event: Ui5CustomEvent<InputDomRef, never>) => {
					event.preventDefault();
					let objectName = event.target.value?.toUpperCase() as string;
					if (objectName == "") {
						setFilterValueState({
							...filterValueState,
							objectNameState: ValueState.Error,
							objectNameStateMessage: getI18nText(
								"translate.filters.fieldMandatory"
							),
						});
					} else {
						setFilterValueState({
							...filterValueState,
							objectNameState: ValueState.None,
							objectNameStateMessage: "",
						});
						setParamsObjectsTranslateAction({
							...paramsObjectsTranslate,
							objectName: objectName,
						});
					}
				}}
				value={paramsObjectsTranslate.objectName}
				valueState={filterValueState.objectNameState}
				valueStateMessage={
					<Text>{filterValueState.objectNameStateMessage}</Text>
				}
			/>
		</FlexBox>
	);
};

export default FilterObject;
