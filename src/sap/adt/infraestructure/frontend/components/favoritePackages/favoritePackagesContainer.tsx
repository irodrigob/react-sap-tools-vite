import { FC } from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import ToolbarFavoritePackages from "./toolbarFavoritePackages";
import CollapsibleCustom from "@/shared/frontend/components/collapsibleCustom";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import TreeFavoritePackages from "./treeFavoritePackages";

interface Props {
	onOpenChange?: (value: boolean) => void;
}

const FavoritePackagesContainer: FC<Props> = ({
	onOpenChange: onCollapsed,
}) => {
	const { getI18nText } = useTranslations();
	const { favoritePackages } = useAppSelector((state) => state.ADT);

	return (
		<CollapsibleCustom
			titleCollapsed={getI18nText("adtIde.favoritePackages.titleToolbar")}
			headerToolbar={<ToolbarFavoritePackages />}
			onOpenChange={onCollapsed}
			defaultOpen={true}
			contentExpanded={
				<TreeFavoritePackages favoritePackages={favoritePackages} />
			}
		/>
	);
};

export default FavoritePackagesContainer;
