import { FC } from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import CollapsibleCustom from "@/shared/frontend/components/collapsibleCustom";
import { useTranslations } from "translations/i18nContext";
import OutlineObjectContainer from "./outlineObjectContainer";

interface Props {
	onCollapsed?: (value: boolean) => void;
}

const OutlineObjectMain: FC<Props> = ({ onCollapsed }) => {
	const { getI18nText } = useTranslations();

	return (
		<CollapsibleCustom
			titleCollapsed={getI18nText("adtIde.outline.titleCollapsed")}
			contentExpanded={<OutlineObjectContainer />}
			onCollapsed={onCollapsed}
		/>
	);
};

export default OutlineObjectMain;
