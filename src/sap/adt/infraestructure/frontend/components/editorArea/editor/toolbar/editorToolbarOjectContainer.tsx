import { useEffect, useState } from "react";
import { useAppSelector } from "shared/storage/useStore";
import { ADT_OBJECT_TYPES } from "sap/adt/infraestructure/constants/adtConstants";
import ClassToolbar from "./classToolbar";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";

export default function EditorToolbarOjectContainer() {
	const { objectsEditor, objectKeyActive } = useAppSelector(
		(state) => state.ADT
	);
	const [objectEditor, setObjectEditor] = useState<ADTObjectEditor | null>();

	useEffect(() => {
		setObjectEditor(
			objectsEditor.find((row) => row.objectKey == objectKeyActive)
		);
	}, [objectKeyActive]);
	return (
		<>
			{objectEditor &&
				objectEditor.objectInfo.objectType.includes(
					ADT_OBJECT_TYPES.CLASSES.OBJECT_TYPE
				) && <ClassToolbar objectEditor={objectEditor as ADTObjectEditor} />}
		</>
	);
}
