import { useTranslations } from "translations/i18nContext";
import { FC, useEffect, useState } from "react";
import { LoadingSpinner } from "shared/frontend/components/loadingSpinner";
import usePackageContent from "sap/adt/infraestructure/frontend/hooks/usePackageContent";

interface Props {
	packageName: string;
}
const PackageContentContainer: FC<Props> = ({ packageName }) => {
	const { getI18nText } = useTranslations();
	const { getPackageContent, loadingPackage } = usePackageContent();

	useEffect(() => {
		if (packageName != "") {
			getPackageContent(packageName);
		}
	}, [packageName]);
	return (
		<div className="flex items-center grow ml-11 py-2">
			{loadingPackage && (
				<LoadingSpinner
					text={getI18nText(
						"adtIde.favoritePackages.packageContent.loadingData"
					)}
				/>
			)}
		</div>
	);
};

export default PackageContentContainer;
