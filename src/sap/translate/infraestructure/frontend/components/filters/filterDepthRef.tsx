import { FC } from "react";
import {
	Input,
	InputDomRef,
	Text,
	ValueState,
	Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";
import { FiltersValueState } from "sap/translate/infraestructure/types/translate";
import { useAppSelector } from "shared/storage/useStore";
import useSAPTranslateStore from "sap/translate/infraestructure/frontend/hooks/useSAPTranslateStore";

interface Props {
	filterValueState: FiltersValueState;
	setFilterValueState: (value: FiltersValueState) => void;
}

const FilterDepthRef: FC<Props> = (props: Props) => {
	const { filterValueState, setFilterValueState } = props;
	const { paramsObjectsTranslate } = useAppSelector(
		(state) => state.SAPTranslate
	);
	const { setParamsObjectsTranslateAction } = useSAPTranslateStore();
	const { getI18nText } = useTranslations();

	return (
		<Input
			placeholder={getI18nText("translate.filters.placeholderDepthRef")}
			value={paramsObjectsTranslate.depthRefs.toString()}
			type="Number"
			onChange={(event: Ui5CustomEvent<InputDomRef, never>) => {
				event.preventDefault();
				let depthRef = parseInt(event.target.value as string);

				let newFilterValueState = { ...filterValueState };
				newFilterValueState.depthRef = ValueState.None;
				newFilterValueState.depthRefMessage = "";

				if (depthRef == 0 || isNaN(depthRef)) {
					depthRef = 1;
					newFilterValueState.depthRef = ValueState.Information;
					newFilterValueState.depthRefMessage = getI18nText(
						"translate.filters.minDepthRef"
					);
				} else if (depthRef > 10) {
					depthRef = 10;
					newFilterValueState.depthRef = ValueState.Warning;
					newFilterValueState.depthRefMessage = getI18nText(
						"translate.filters.rangeDepthRef"
					);
				}
				setParamsObjectsTranslateAction({
					...paramsObjectsTranslate,
					depthRefs: depthRef,
				});
				setFilterValueState(newFilterValueState);
			}}
			valueState={filterValueState.depthRef}
			valueStateMessage={<Text>{filterValueState.depthRefMessage}</Text>}
		/>
	);
};

export default FilterDepthRef;
