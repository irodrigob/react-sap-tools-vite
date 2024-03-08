import { useAppSelector } from "shared/storage/useStore";
import CollapsibleCustom from "@/shared/frontend/components/collapsibleCustom";
import { useTranslations } from "translations/i18nContext";
import OutlineObject from "./outlineObject";
import { useMemo } from "react";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";

export default function OutlineObjectContainer() {
	const { getI18nText } = useTranslations();
	const { objectsEditor, objectKeyActive } = useAppSelector(
		(state) => state.ADT
	);

	const objectEditorActive = useMemo(() => {
		return objectsEditor.find(
			(row) => row.objectKey == objectKeyActive
		) as ADTObjectEditor;
	}, [objectKeyActive, objectsEditor]);

	return (
		<div>
			{objectEditorActive && (
				<CollapsibleCustom
					titleCollapsed={getI18nText("adtIde.outline.titleCollapsed")}
					contentExpanded={<OutlineObject objectEditor={objectEditorActive} />}
				/>
			)}
		</div>
	);
}
