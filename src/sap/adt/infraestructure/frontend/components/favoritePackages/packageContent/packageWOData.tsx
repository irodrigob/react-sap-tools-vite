import { useTranslations } from "translations/i18nContext";

export default function PackageWOData() {
	const { getI18nText } = useTranslations();

	return (
		<h5 className="text-md ml-9 py-2 italic">
			{getI18nText("adtIde.favoritePackages.packageContent.noData")}
		</h5>
	);
}
