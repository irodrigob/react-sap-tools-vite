import { useAppSelector } from "shared/storage/useStore";
import CollapsibleCustom from "@/shared/frontend/components/collapsibleCustom";
import { useTranslations } from "translations/i18nContext";

export default function OutlineObjectContainer() {
	const { getI18nText } = useTranslations();
	const { objectEditorActive } = useAppSelector((state) => state.ADT);

	return (
		<div>
			{objectEditorActive.objectKey != "" && (
				<CollapsibleCustom
					titleCollapsed={getI18nText("adtIde.outline.titleCollapsed")}
					contentExpanded={<p>hola</p>}
				/>
			)}
		</div>
	);
}
