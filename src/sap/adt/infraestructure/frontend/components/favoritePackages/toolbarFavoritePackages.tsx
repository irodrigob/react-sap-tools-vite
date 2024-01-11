import { FC, useState } from "react";
import {
	Button,
	Title,
	Toolbar,
	ToolbarSpacer,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/add-favorite";

import { useTranslations } from "translations/i18nContext";
import PopupAddPackageContainer from "./popupAddPackage/popupAddPackageContainer";

interface Props {
	slot?: string;
}

const ToolbarFavoritePackages: FC<Props> = (props: Props) => {
	const [openAddPackage, setOpenAddPackage] = useState(false);
	const { getI18nText } = useTranslations();
	const { slot } = props;
	return (
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
					setOpenAddPackage(false);
				}}
				onConfirmButton={() => {}}
			/>
		</>
	);
};

export default ToolbarFavoritePackages;
