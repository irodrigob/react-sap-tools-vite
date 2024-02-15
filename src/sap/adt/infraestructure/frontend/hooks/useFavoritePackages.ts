import { useCallback } from "react";
import SAPAdtController from "sap/adt/infraestructure/controller/sapAdtController";
import { useTranslations } from "translations/i18nContext";
import useSAPGeneral from "sap/general/infraestructure/frontend/hooks/useSAPGeneral";
import { ResponsePackageContent } from "sap/adt/infraestructure/types/adt";
import useMessages from "shared/infraestructure/hooks/useMessages";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import {
	AdtPackageContents,
	AdtPackageObject,
} from "sap/adt/domain/entities/packageContent";
import useAdtStore from "./useAdtStore";
import { TreeAttributeMap } from "sap/adt/infraestructure/types/tree";
import { useAppSelector } from "shared/storage/useStore";
import useEditor from "./useEditor";

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
	} = useAdtStore();
	const { objectOpenEditor } = useAppSelector((state) => state.ADT);
	const { getObjectContent } = useEditor();

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
		(
			packageName: string,
			category: string,
			objectType: string,
			objectTypeDesc: string,
			object: AdtPackageObject
		) => {
			// Si esta abierto inicialmente no haremos nada.
			if (
				objectOpenEditor.findIndex(
					(row) =>
						row.objectType == objectType &&
						row.object.objectName == object.objectName
				) == -1
			) {
				/* Se añade el el objeto al modelo de datos para el editor*/
				addObjectEditorAction({
					packageName: packageName,
					category: category,
					objectType: objectType,
					objectTypeDesc: objectTypeDesc,
					object: object,
					loadingContent: true,
				});
				// Lectura del contenido del objeto
				getObjectContent(objectType, objectTypeDesc, object);
			}
		},
		[objectOpenEditor]
	);

	return { getPackageContent, expandCollapseNode, processObjectSelected };
}
