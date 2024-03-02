import { useCallback } from "react";
import SelectSectionSource from "./selectSectionSource";
import { useAppSelector } from "shared/storage/useStore";
import useToolbar from "sap/adt/infraestructure/frontend/hooks/useToolbar";

const ClassToolbar = () => {
	const { objectKeyActive, objectEditorActive } = useAppSelector(
		(state) => state.ADT
	);
	const { changeSectionSource } = useToolbar();

	const handlerChangeSectionSource = useCallback(
		(section: string) => {
			changeSectionSource(objectEditorActive, section);
		},
		[objectKeyActive, objectEditorActive]
	);

	return (
		<div className="flex items-center justify-center">
			<SelectSectionSource
				sectionSource={objectEditorActive.sectionSource as string}
				onChangeSection={handlerChangeSectionSource}
			/>
		</div>
	);
};

export default ClassToolbar;
