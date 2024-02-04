import ToolbarFavoritePackages from "./toolbarFavoritePackages";
import CollapsibleCustom from "@/shared/frontend/components/collapsibleCustom";
import "@ui5/webcomponents-icons/dist/delete";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import TreeFavoritePackages from "./treeFavoritePackages";

export default function FavoritePackagesContainer() {
	const { getI18nText } = useTranslations();
	const { favoritePackages } = useAppSelector((state) => state.ADT);

	return (
		<CollapsibleCustom
			titleCollapsed={getI18nText("adtIde.favoritePackages.titleToolbar")}
			headerToolbar={<ToolbarFavoritePackages />}
			contentExpanded={
				<TreeFavoritePackages favoritePackages={favoritePackages} />
			}
		/>
	);
}
