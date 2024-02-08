import { useTranslations } from "translations/i18nContext";
import { FC, useEffect, useState } from "react";
import { ADTFavoritePackage } from "sap/adt/domain/entities/favoritePackage";
import { LoadingSpinner } from "shared/frontend/components/loadingSpinner";
import usePackageContent from "sap/adt/infraestructure/frontend/hooks/usePackageContent";
import { useAppSelector } from "shared/storage/useStore";
import { INIT_FAVORITE_PACKAGE } from "sap/adt/infraestructure/constants/treeConstants";

interface Props {
	packageName: string;
}
const PackageContentContainer: FC<Props> = ({ packageName }) => {
	const { getI18nText } = useTranslations();
	const { getPackageContent } = usePackageContent();
	const { favoritePackages } = useAppSelector((state) => state.ADT);
	const [packageInfo, setPackageInfo] = useState<ADTFavoritePackage>(
		INIT_FAVORITE_PACKAGE
	);

	useEffect(() => {
		if (packageName != "") {
			getPackageContent(packageName);
			setPackageInfo(
				favoritePackages.find(
					(row) => row.packageName == packageName
				) as ADTFavoritePackage
			);
		}
	}, [packageName]);
	return (
		<div className="flex items-center grow ml-11 py-2">
			{packageInfo.loadingContent && (
				<LoadingSpinner
					text={getI18nText(
						"adtIde.favoritePackages.packageContent.loadingData"
					)}
				/>
			)}
			{!packageInfo.loadingContent && <p>prueba</p>}
		</div>
	);
};

export default PackageContentContainer;
