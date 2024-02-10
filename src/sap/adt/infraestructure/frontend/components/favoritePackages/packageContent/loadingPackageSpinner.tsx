import { useTranslations } from "translations/i18nContext";
import { LoadingSpinner } from "shared/frontend/components/loadingSpinner";

export default function LoadingPackageSpinner() {
	const { getI18nText } = useTranslations();

	return (
		<LoadingSpinner
			className="ml-9 py-2"
			text={getI18nText("adtIde.favoritePackages.packageContent.loadingData")}
		/>
	);
}
