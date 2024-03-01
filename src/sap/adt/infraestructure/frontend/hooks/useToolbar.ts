import { useCallback } from "react";
import useAdtStore from "./useAdtStore";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";

export default function useToolbar() {
	const { setObjectEditorActiveAction, updateObjectEditorAction } =
		useAdtStore();
	/**
	 * Cambia la sección de codigo fuente del editor pasado por parametro
	 */
	const changeSectionSource = useCallback(
		(objectEditor: ADTObjectEditor, sectionSource: string) => {
			let newObjectEditor = {
				...objectEditor,
				sectionSource: sectionSource,
			};

			setObjectEditorActiveAction(newObjectEditor);
			updateObjectEditorAction(newObjectEditor);
		},
		[]
	);

	return { changeSectionSource };
}
