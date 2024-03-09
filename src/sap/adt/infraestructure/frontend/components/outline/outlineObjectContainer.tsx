import { useAppSelector } from "shared/storage/useStore";
import CollapsibleCustom from "@/shared/frontend/components/collapsibleCustom";
import { useTranslations } from "translations/i18nContext";
import OutlineObject from "./outlineObject";
import { useMemo } from "react";
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
			{objectEditorActive && (
				<CollapsibleCustom
					titleCollapsed={getI18nText("adtIde.outline.titleCollapsed")}
					contentExpanded={
						objectEditorActive.loadingStructure ? (
							<LoadingSpinner
								text={getI18nText("adtIde.outline.loadingContent")}
							/>
						) : (
							<OutlineObject objectEditor={objectEditorActive} />
						)
					}
				/>
			)}
		</>
	);
}
