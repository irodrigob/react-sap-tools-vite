import { FC } from "react";
import { ADTFavoritePackage } from "sap/adt/domain/entities/favoritePackage";
import useFavoritePackages from "@/sap/adt/infraestructure/frontend/hooks/useFavoritePackages";
import PackageWOData from "./packageWOData";
import PackageContent from "./packageContent";
import LoadingPackageSpinner from "./loadingPackageSpinner";
interface Props {
	favoritePackage: ADTFavoritePackage;
}
const PackageContentContainer: FC<Props> = ({ favoritePackage }) => {
	const {} = useFavoritePackages();

	return (
		<>
			{favoritePackage.loadingContent && <LoadingPackageSpinner />}
			{favoritePackage.loadedContent && (
				<PackageContent
					packageName={favoritePackage.packageName}
					content={favoritePackage.content}
				/>
			)}
		</>
	);
};

export default PackageContentContainer;
