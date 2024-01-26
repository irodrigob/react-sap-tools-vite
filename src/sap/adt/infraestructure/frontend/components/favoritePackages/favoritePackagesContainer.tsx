import {
	Button,
	Icon,
	Panel,
	Text,
	Title,
	Toolbar,
	Tree,
	TreeItem,
	TreeItemCustom,
} from "@ui5/webcomponents-react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ToolbarFavoritePackages from "./toolbarFavoritePackages";
import CollapsibleCustom from "@/shared/frontend/components/collapsibleCustom";
import "@ui5/webcomponents-icons/dist/delete";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import { ADTFavoritePackage } from "sap/adt/domain/entities/favoritePackage";

export default function FavoritePackagesContainer() {
	const { getI18nText } = useTranslations();
	const { favoritePackages } = useAppSelector((state) => state.ADT);
	/*

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
	*/
	return <CollapsibleCustom />;
}
