import { FC, useCallback, useState } from "react";
import { Title, Toolbar, ToolbarSpacer } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/add-favorite";
import { Button } from "@/components/ui/button";
import { useTranslations } from "translations/i18nContext";
import PopupAddPackageContainer from "./popupAddPackage/popupAddPackageContainer";
import AddFavorite from "shared/frontend/icons/add-Favorite";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

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

	/*

	*/
	return (
		<>
			<div className="flex items-center justify-between space-x-1 px-2">
				<Button
					onClick={() => setOpenAddPackage(true)}
					variant="ghost"
					size="sm"
				>
					<AddFavorite className="h-5 w-5 text-blue-500" />
				</Button>
			</div>
			<PopupAddPackageContainer
				open={openAddPackage}
				onOpenChange={setOpenAddPackage}
				onCloseButton={() => {
					setOpenAddPackage(false);
				}}
				onConfirmButton={() => {}}
			/>
		</>
	);
};

export default ToolbarFavoritePackages;
