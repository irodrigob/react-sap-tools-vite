import ToolbarFavoritePackages from "./toolbarFavoritePackages";
import CollapsibleCustom from "@/shared/frontend/components/collapsibleCustom";
import "@ui5/webcomponents-icons/dist/delete";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import TreeFavoritePackages from "./treeFavoritePackages";

export default function FavoritePackagesContainer() {
	const { getI18nText } = useTranslations();
	const { favoritePackages } = useAppSelector((state) => state.ADT);
	/*
	return (
		<>
			<Panel
				header={<ToolbarFavoritePackages />}
				headerText={getI18nText("adtIde.favoritePackages.titleToolbar")}
				onToggle={function _a() {}}
				style={{ marginLeft: "0.5rem", paddingTop: "0.5rem" }}
			>
				<Tree
					onItemClick={function _a() {}}
					onItemDelete={function _a() {}}
					onItemMouseout={function _a() {}}
					onItemMouseover={function _a() {}}
					onItemToggle={function _a() {}}
					onSelectionChange={function _a() {}}
				>
					{favoritePackages &&
						favoritePackages.length > 0 &&
						favoritePackages.map((favoritePackage: ADTFavoritePackage) => {
							return (
								<TreeItemCustom
									key={favoritePackage.packageName}
									content={
										<section
											style={{
												width: "100%",
												display: "flex",
											}}
										>
											<Text>{favoritePackage.packageName}</Text>
											<div style={{ marginLeft: "auto" }}>
												<Icon
													name="delete"
													interactive={true}
													design="Negative"
												/>
											</div>
										</section>
									}
								/>
							);
						})}
				</Tree>
			</Panel>
			<CollapsibleCustom
				titleCollapsed={getI18nText("adtIde.favoritePackages.titleToolbar")}
			/>
		</>
	);*/
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
