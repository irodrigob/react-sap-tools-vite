import { AdtPackageContents } from "sap/adt/domain/entities/packageContent";

export type ADTFavoritePackage = {
	_id: string;
	packageName: string;
	loadingContent: boolean;
	content: AdtPackageContents;
};
export type ADTFavoritePackages = ADTFavoritePackage[];
