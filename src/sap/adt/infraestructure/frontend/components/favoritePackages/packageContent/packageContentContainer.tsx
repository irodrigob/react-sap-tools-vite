import { useTranslations } from "translations/i18nContext";
import { FC, useEffect, useState } from "react";
import { ADTFavoritePackage } from "sap/adt/domain/entities/favoritePackage";
import { LoadingSpinner } from "shared/frontend/components/loadingSpinner";
import usePackageContent from "sap/adt/infraestructure/frontend/hooks/usePackageContent";

interface Props {
	favoritePackage: ADTFavoritePackage;
}
const PackageContentContainer: FC<Props> = ({ favoritePackage }) => {
	const { getI18nText } = useTranslations();
	const { getPackageContent } = usePackageContent();
	const [loading, setLoading] = useState(false);

	return (
		<>
			{favoritePackage.loadingContent && (
				<LoadingSpinner
					className="ml-9 py-2"
					text={getI18nText(
						"adtIde.favoritePackages.packageContent.loadingData"
					)}
				/>
			)}
			{favoritePackage.loadedContent && favoritePackage.content.length == 0 && (
				<h5 className="text-md ml-9 py-2 italic">
					{getI18nText("adtIde.favoritePackages.packageContent.noData")}
				</h5>
			)}
		</>
	);
};

export default PackageContentContainer;
