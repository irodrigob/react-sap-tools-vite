import { useMemo } from "react";
import { useAppSelector } from "shared/storage/useStore";
import EditorToolbar from "./editorToolbar";
import EditorToolbarOjectContainer from "./editorToolbarOjectContainer";
import useEditor from "sap/adt/infraestructure/frontend/hooks/useEditor";

export default function EditorToolbarContainer() {
	const { objectsEditor, objectKeyActive } = useAppSelector(
		(state) => state.ADT
	);
	const { getObjectEditorActive } = useEditor();

	const objectEditorActive = useMemo(() => {
		return getObjectEditorActive();
	}, [objectKeyActive, objectsEditor]);

	return (
		<>
			{objectsEditor.length > 0 && (
				<div className="grid grid-cols-2">
					<EditorToolbar objectEditor={objectEditorActive} />
					<EditorToolbarOjectContainer objectEditor={objectEditorActive} />
				</div>
			)}
		</>
	);
}
