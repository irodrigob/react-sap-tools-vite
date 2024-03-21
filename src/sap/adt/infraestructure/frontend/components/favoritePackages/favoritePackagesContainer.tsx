import { FC } from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import ToolbarFavoritePackages from "./toolbarFavoritePackages";
import CollapsibleCustom from "@/shared/frontend/components/collapsibleCustom";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import TreeFavoritePackages from "./treeFavoritePackages";

interface Props {
	onCollapsed?: (value: boolean) => void;
}

const FavoritePackagesContainer: FC<Props> = ({ onCollapsed }) => {
	const { getI18nText } = useTranslations();
	const { favoritePackages } = useAppSelector((state) => state.ADT);

	return (
		<CollapsibleCustom
			titleCollapsed={getI18nText("adtIde.favoritePackages.titleToolbar")}
			headerToolbar={<ToolbarFavoritePackages />}
			onCollapsed={onCollapsed}
			contentExpanded={
				<TreeFavoritePackages favoritePackages={favoritePackages} />
			}
		/>
	);
};

export default FavoritePackagesContainer;
