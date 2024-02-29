import { useCallback, useEffect, useState } from "react";
import SelectSectionSource from "./selectSectionSource";
import { useAppSelector } from "shared/storage/useStore";
import useEditor from "sap/adt/infraestructure/frontend/hooks/useEditor";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";
import { INIT_OBJECT_EDITOR } from "sap/adt/infraestructure/constants/editorConstants";

const ClassToolbar = () => {
	const { objectKeyActive } = useAppSelector((state) => state.ADT);
	const { getObjectEditorActive } = useEditor();

	const [objectEditor, setObjectEditor] =
		useState<ADTObjectEditor>(INIT_OBJECT_EDITOR);
	useEffect(() => {
		setObjectEditor(getObjectEditorActive());
	}, [objectKeyActive]);

	const changeSectionSource = useCallback((section: string) => {
		console.log(section);
	}, []);

	return (
		<div className="flex items-center justify-center">
			<SelectSectionSource
				sectionSource={objectEditor.sectionSource as string}
				onChangeSection={changeSectionSource}
			/>
		</div>
	);
};

export default ClassToolbar;
