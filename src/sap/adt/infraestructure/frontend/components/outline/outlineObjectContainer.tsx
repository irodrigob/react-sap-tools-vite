import { useMemo } from "react";
import { useAppSelector } from "shared/storage/useStore";
import { useTranslations } from "translations/i18nContext";
import OutlineObject from "./outlineObject";
import useEditor from "sap/adt/infraestructure/frontend/hooks/useEditor";
import { LoadingSpinner } from "shared/frontend/components/loadingSpinner";

export default function OutlineObjectContainer() {
	const { getI18nText } = useTranslations();
	const { getObjectEditorActive } = useEditor();
	const { objectsEditor, objectKeyActive } = useAppSelector(
		(state) => state.ADT
	);

	const objectEditorActive = useMemo(() => {
		return getObjectEditorActive();
	}, [objectKeyActive, objectsEditor]);

	return (
		<>
			{objectEditorActive && objectEditorActive.loadingStructure && (
				<LoadingSpinner text={getI18nText("adtIde.outline.loadingContent")} />
			)}
			{objectEditorActive && !objectEditorActive.loadingStructure && (
				<OutlineObject objectEditor={objectEditorActive} />
			)}
		</>
	);
}
