import { FC } from "react";
import CollapsibleCustom from "@/shared/frontend/components/collapsibleCustom";
import { useTranslations } from "translations/i18nContext";
import OutlineObjectContainer from "./outlineObjectContainer";

interface Props {
	onOpenChange?: (value: boolean) => void;
	defaultOpen?: boolean;
}

const OutlineObjectMain: FC<Props> = ({
	onOpenChange: onCollapsed,
	defaultOpen,
}) => {
	const { getI18nText } = useTranslations();

	return (
		<CollapsibleCustom
			titleCollapsed={getI18nText("adtIde.outline.titleCollapsed")}
			contentExpanded={<OutlineObjectContainer />}
			onOpenChange={onCollapsed}
			defaultOpen={defaultOpen}
		/>
	);
};

export default OutlineObjectMain;
