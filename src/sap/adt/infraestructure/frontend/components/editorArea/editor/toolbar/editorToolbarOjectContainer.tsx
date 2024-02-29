import { useEffect, useState } from "react";
import { useAppSelector } from "shared/storage/useStore";
import { ADT_OBJECT_TYPES } from "sap/adt/infraestructure/constants/adtConstants";
import ClassToolbar from "./class/classToolbar";
import useEditor from "sap/adt/infraestructure/frontend/hooks/useEditor";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";

export default function EditorToolbarOjectContainer() {
	const { objectKeyActive } = useAppSelector((state) => state.ADT);
	const { getObjectEditorActive } = useEditor();
	const [objectEditor, setObjectEditor] = useState<ADTObjectEditor | null>();

	useEffect(() => {
		setObjectEditor(getObjectEditorActive());
	}, [objectKeyActive]);

	return (
		<>
			{objectEditor &&
				objectEditor.objectInfo.objectType.includes(
					ADT_OBJECT_TYPES.CLASSES.OBJECT_TYPE
				) && <ClassToolbar />}
		</>
	);
}
