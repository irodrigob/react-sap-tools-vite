import { FC } from "react";
import { ADTFavoritePackage } from "sap/adt/domain/entities/favoritePackage";
import usePackageContent from "sap/adt/infraestructure/frontend/hooks/usePackageContent";
import PackageWOData from "./packageWOData";
import PackageContent from "./packageContent";
import LoadingPackageSpinner from "./loadingPackageSpinner";
interface Props {
	favoritePackage: ADTFavoritePackage;
}
const PackageContentContainer: FC<Props> = ({ favoritePackage }) => {
	const {} = usePackageContent();

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
