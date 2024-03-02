import { useCallback } from "react";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";
import useEditor from "./useEditor";

export default function useToolbar() {
	const { updateModelObjectEditor } = useEditor();
	/**
	 * Cambia la sección de codigo fuente del editor pasado por parametro
	 */
	const changeSectionSource = useCallback(
		(objectEditor: ADTObjectEditor, sectionSource: string) => {
			let newObjectEditor = {
				...objectEditor,
				sectionSource: sectionSource,
			};

			updateModelObjectEditor(newObjectEditor);
		},
		[]
	);

	return { changeSectionSource };
}
