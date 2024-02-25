import { useCallback } from "react";
import useAdtStore from "./useAdtStore";
import { ADTObjectInfoEditor } from "sap/adt/infraestructure/types/adt";
import { useAppSelector } from "shared/storage/useStore";

export default function useEditorGroup() {
	const { objectKeyActive, objectsEditor, objectKeyPrevious } = useAppSelector(
		(state) => state.ADT
	);
	const {
		deleteObjectEditorAction,
		setObjectKeyActiveAction,
		setObjectKeyPreviousAction,
	} = useAdtStore();
	const closeTab = useCallback(
		(objectInfo: ADTObjectInfoEditor) => {
			// Debido a como esta montando el cierre dentro del trigger del compontente, cuando se cierra una pestaña que no es la activa
			// esta se activa y se cierra a la vez, haciendo que no quede ninguna pestaña activa.

			// Busco la pestaña que se cierra
			let objectEditorClose = objectsEditor.find(
				(row) =>
					row.objectInfo.objectType == objectInfo.objectType &&
					row.objectInfo.object.objectName == objectInfo.object.objectName
			);
			if (objectEditorClose) {
				if (objectEditorClose.objectKey == objectKeyActive) {
					// Si la que se cierra es la activa, se activa la pestaña anterior
					setObjectKeyActiveAction(objectKeyPrevious);
					// El gap que tenemos es que la storage automáticamente poner la pestaña activa como previa, pero
					// esta pestaña se ha cerrado. Por lo tanto, sobreescribo para que guarde la primera que sea distinta
					// a la actual siempre y cuando haya más de una. Sino lo hay la dejo en blanco
					if (objectsEditor.length > 1)
						setObjectKeyPreviousAction(
							objectsEditor.find((row) => row.objectKey != objectKeyActive)
								?.objectKey as string
						);
					else setObjectKeyPreviousAction("");
				} else {
					// Si no es la activa
				}
			}
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
