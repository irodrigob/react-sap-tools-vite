import { useMemo } from "react";
import { useAppSelector } from "shared/storage/useStore";
import useEditor from "sap/adt/infraestructure/frontend/hooks/useEditor";

export default function ProblemsContainer() {
	const { getObjectEditorActive } = useEditor();
	const { objectsEditor, objectKeyActive } = useAppSelector(
		(state) => state.ADT
	);

	const objectEditorActive = useMemo(() => {
		return getObjectEditorActive();
	}, [objectKeyActive, objectsEditor]);

	return (
		<>
			{objectEditorActive && (
				<p>{objectEditorActive.objectInfo.object.objectName}</p>
			)}
		</>
	);
}
