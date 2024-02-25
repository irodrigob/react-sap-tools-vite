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
					// Si solo hay un registro se va a eliminar la ultima pestaña por lo que reseteo todos los valores
					if (objectsEditor.length == 1) {
						setObjectKeyActiveAction("");
						setObjectKeyPreviousAction("");
					} else {
						// Si la que se cierra es la activa se activa la pestaña anterior siempre y cuando haya una anterior.
						// Si la activa y la previa son iguales o la previa esta en blanco se activa cualquiera distinta a la actual.
						if (
							objectKeyPrevious == "" ||
							objectKeyActive == objectKeyPrevious
						) {
							setObjectKeyActiveAction(
								objectsEditor.find((row) => row.objectKey != objectKeyActive)
									?.objectKey as string
							);
						} else {
							setObjectKeyActiveAction(objectKeyPrevious);
						}
					}
				} else {
					// Si no es la activa. Hay que mirar si la pestaña previa coincide con la que se cierra. Si es así, la previa se deja en blanco
					if (objectEditorClose.objectKey == objectKeyPrevious) {
						setObjectKeyPreviousAction("");
					}
				}
			}

			deleteObjectEditorAction(objectInfo);
		},
		[objectsEditor, objectKeyActive]
	);

	return { closeTab };
}
