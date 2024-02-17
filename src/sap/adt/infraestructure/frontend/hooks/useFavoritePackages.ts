import { useCallback } from "react";
import SAPAdtController from "sap/adt/infraestructure/controller/sapAdtController";
import { useTranslations } from "translations/i18nContext";
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
	const { getI18nText } = useTranslations();
	const adtController = new SAPAdtController();
	const { getDataForConnection } = useSAPGeneral();
	const { showResultError } = useMessages();
	const {
		setLoadingContentPackageAction,
		setLoadedContentPackageAction,
		setContentPackageAction,
		addObjectEditorAction,
		setObjectKeyActiveAction,
	} = useAdtStore();
	const { objectsEditor } = useAppSelector((state) => state.ADT);
	const { getObjectContent, checkObjectExist } = useEditor();

	const expandCollapseNode = useCallback(
		(node: string, treeAttributeMap: TreeAttributeMap): TreeAttributeMap => {
			let newTreeAttributes = { ...treeAttributeMap };
			if (newTreeAttributes[node])
				newTreeAttributes[node].expanded = !newTreeAttributes[node].expanded;
			else
				newTreeAttributes = {
					...treeAttributeMap,
					[node]: { expanded: true },
				};

			return newTreeAttributes;
		},
		[]
	);

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
				let objectKey = `${objectInfo.objectType}_${objectInfo.object.objectName}`;

				if (objectsEditor.length == 0) setObjectKeyActiveAction(objectKey);

				addObjectEditorAction({
					objectInfo: objectInfo,
					loadingContent: true,
					objectKey: objectKey,
				});

				// Lectura del contenido del objeto
				getObjectContent(objectInfo);
			}
		},
		[objectsEditor]
	);

	return { getPackageContent, expandCollapseNode, processObjectSelected };
}
