import { useCallback } from "react";
import useAdtStore from "./useAdtStore";
import {
	ADTObjectEditor,
	ADTObjectInfoEditor,
} from "sap/adt/infraestructure/types/adt";
import { useAppSelector } from "shared/storage/useStore";
import { INIT_OBJECT_EDITOR } from "sap/adt/infraestructure/constants/editorConstants";

export default function useEditorGroup() {
	const { objectKeyActive, objectsEditor, objectKeyPrevious } = useAppSelector(
		(state) => state.ADT
	);
	const {
		deleteObjectEditorAction,
		setObjectKeyActiveAction,
		setObjectKeyPreviousAction,
	} = useAdtStore();

	/**
	 * Proceso al cerrar una pestaña
	 */
	const closeTab = useCallback(
		(objectKey: string) => {
			// Debido a como esta montando el cierre dentro del trigger del compontente, cuando se cierra una pestaña que no es la activa
			// esta se activa y se cierra a la vez, haciendo que no quede ninguna pestaña activa.

			// Busco la pestaña que se cierra
			let objectEditorClose = objectsEditor.find(
				(row) => row.objectKey == objectKey
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
							let objectEditor = objectsEditor.find(
								(row) => row.objectKey != objectKeyActive
							) as ADTObjectEditor;
							setObjectKeyActiveAction(objectEditor.objectKey);
						} else {
							let objectEditor = objectsEditor.find(
								(row) => row.objectKey == objectKeyPrevious
							) as ADTObjectEditor;
							setObjectKeyActiveAction(objectEditor.objectKey);
						}
					}
				} else {
					// Si no es la activa. Hay que mirar si la pestaña previa coincide con la que se cierra. Si es así, la previa se deja en blanco
					if (objectEditorClose.objectKey == objectKeyPrevious) {
						setObjectKeyPreviousAction("");
					}
				}
			}

			deleteObjectEditorAction(objectKey);
		},
		[objectsEditor, objectKeyActive]
	);
	/**
	 * Proceso cuando se selecciona una pestaña
	 */
	const selectTab = useCallback(
		(objectKey: string) => {
			setObjectKeyPreviousAction(objectKeyActive);
			setObjectKeyActiveAction(objectKey);
		},
		[objectKeyActive, objectsEditor]
	);

	return { closeTab, selectTab };
}
