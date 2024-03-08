import { useCallback } from "react";
import SAPAdtController from "sap/adt/infraestructure/controller/sapAdtController";
import useSAPGeneral from "sap/general/infraestructure/frontend/hooks/useSAPGeneral";
import { ResponsePackageContent } from "sap/adt/infraestructure/types/adt";
import useMessages from "shared/infraestructure/hooks/useMessages";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { AdtPackageContents } from "sap/adt/domain/entities/packageContent";
import useAdtStore from "./useAdtStore";
import { TreeAttributeMap } from "sap/adt/infraestructure/types/tree";
import { useAppSelector } from "shared/storage/useStore";
import useEditor from "./useEditor";
import { ADTObjectInfoEditor } from "sap/adt/infraestructure/types/adt";

export default function useFavoritePackages() {
	const adtController = new SAPAdtController();
	const { objectsEditor, treeAttributesMap } = useAppSelector(
		(state) => state.ADT
	);
	const { getDataForConnection } = useSAPGeneral();
	const { showResultError } = useMessages();
	const {
		setLoadingContentPackageAction,
		setLoadedContentPackageAction,
		setContentPackageAction,
		addObjectEditorAction,
		setObjectKeyActiveAction,
		setAttributesMapAction,
	} = useAdtStore();

	const {
		getObjectContent,
		checkObjectExist,
		buildObjectKey,
		getDefaultSectionSource,
	} = useEditor();

	const getPackageContent = useCallback((packageName: string) => {
		setLoadingContentPackageAction(packageName);
		adtController
			.getPackageContent(getDataForConnection("base"), packageName)
			.then((response: ResponsePackageContent) => {
				setLoadingContentPackageAction(packageName);
				setLoadedContentPackageAction(packageName);
				if (response.isSuccess) {
					setContentPackageAction({
						packageName: packageName,
						content: response.getValue() as AdtPackageContents,
					});
				} else {
					showResultError(response.getErrorValue() as ErrorGraphql);
				}
			});
	}, []);
	const processObjectSelected = useCallback(
		(objectInfo: ADTObjectInfoEditor) => {
			// Si esta abierto inicialmente no haremos nada.
			if (!checkObjectExist(objectInfo)) {
				let objectKey = buildObjectKey(objectInfo);

				setObjectKeyActiveAction(objectKey);

				addObjectEditorAction({
					objectInfo: objectInfo,
					loadingContent: true,
					objectKey: objectKey,
					sectionSource: getDefaultSectionSource(objectInfo.objectType),
				});

				// Lectura del contenido del objeto y se le indica que el objeto a leer es el activo.
				getObjectContent(objectInfo, true);
			}
		},
		[objectsEditor]
	);

	return { getPackageContent, processObjectSelected };
}
