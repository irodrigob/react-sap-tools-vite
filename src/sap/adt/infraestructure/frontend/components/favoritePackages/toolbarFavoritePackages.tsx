import { FC, useCallback, useState } from "react";
import { Title, Toolbar, ToolbarSpacer } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/add-favorite";
import { Button } from "@/components/ui/button";
import { useTranslations } from "translations/i18nContext";
import PopupAddPackageContainer from "./popupAddPackage/popupAddPackageContainer";
import AddFavorite from "shared/frontend/icons/add-Favorite";

interface Props {
	slot?: string;
}

const ToolbarFavoritePackages: FC<Props> = (props: Props) => {
	const [openAddPackage, setOpenAddPackage] = useState(false);
	const { getI18nText } = useTranslations();
	const { slot } = props;
	const handlerAddPackage = useCallback((addPackage: string) => {}, []);
	/*

<>
			<Toolbar slot={slot}>
				<Title level="H5">
					{getI18nText("adtIde.favoritePackages.titleToolbar")}
				</Title>
				<ToolbarSpacer />
				<Button
					design="Transparent"
					icon="add-favorite"
					tooltip={getI18nText(
						"adtIde.favoritePackages.addFavoritePackageTooltip"
					)}
					onClick={() => setOpenAddPackage(true)}
				></Button>
			</Toolbar>
			<PopupAddPackageContainer
				open={openAddPackage}
				onCloseButton={() => {
					setOpenAddPackage(!openAddPackage);
				}}
				onConfirmButton={(addPackage: string) => {
					setOpenAddPackage(!openAddPackage);
					handlerAddPackage(addPackage);
				}}
			/>
		</>
	*/
	return (
		<div className="flex items-center justify-between space-x-1 px-2">
			<Button onClick={() => setOpenAddPackage(true)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-4 h-4"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M7 160h145q5 0 7-5L218 5q3-5 7-5t6 5l59 150q2 5 6 5h145q5 0 7 5t-2 8l-115 88q-3 3-2 8l12 32-82 60-31-22q-2-2-4-2l-1 1h-1q-1 0-2 1L67 447q-1 1-4 1t-5.5-2.5-.5-6.5l63-170q2-5-3-8L3 173q-4-3-2.5-8t6.5-5zm281 224h96v-96h32v96h96v32h-96v96h-32v-96h-96v-32z"
					/>
				</svg>
			</Button>
		</div>
	);
};

export default ToolbarFavoritePackages;
