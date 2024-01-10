import { FC } from "react";
import {
	Button,
	Title,
	Toolbar,
	ToolbarSpacer,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/add-favorite";

import { useTranslations } from "translations/i18nContext";

interface Props {
	slot?: string;
}

const ToolbarFavoritePackages: FC<Props> = (props: Props) => {
	const { getI18nText } = useTranslations();
	const { slot } = props;
	return (
		<Toolbar slot={slot}>
			<Title level="H5">
				{getI18nText("adtIde.favoritePackages.titleToolbar")}
			</Title>
			<ToolbarSpacer />
			<Button
				design="Emphasized"
				icon="add-favorite"
				tooltip={getI18nText(
					"adtIde.favoritePackages.addFavoritePackageTooltip"
				)}
			></Button>
		</Toolbar>
	);
};

export default ToolbarFavoritePackages;
