import { useCallback } from "react";
import useAdtStore from "./useAdtStore";
import { ADTObjectInfoEditor } from "sap/adt/infraestructure/types/adt";
import { useAppSelector } from "shared/storage/useStore";

export default function useEditorGroup() {
	const { objectKeyActive, objectsEditor } = useAppSelector(
		(state) => state.ADT
	);
	const { deleteObjectEditorAction, setObjectKeyActiveAction } = useAdtStore();
	const closeTab = useCallback(
		(objectInfo: ADTObjectInfoEditor) => {
			// Si el objeto que se quita del editor es el que esta activo, activo la primera pestaña
			if (
				objectsEditor.findIndex(
					(row) =>
						row.objectInfo.objectType == objectInfo.objectType &&
						row.objectInfo.object.objectName == objectInfo.object.objectName &&
						row.objectKey == objectKeyActive
				) != 1 &&
				objectsEditor.length > 1
			)
				setObjectKeyActiveAction(
					objectsEditor.find((row) => row.objectKey != objectKeyActive)
						?.objectKey as string
				);

			deleteObjectEditorAction(objectInfo);
		},
		[objectsEditor, objectKeyActive]
	);

	return { closeTab };
}
