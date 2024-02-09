import { AdtPackageContents } from "sap/adt/domain/entities/packageContent";

export type ADTFavoritePackage = {
	_id: string;
	packageName: string;
	loadingContent: boolean;
	loadedContent: boolean;
	content: AdtPackageContents;
};
export type ADTFavoritePackages = ADTFavoritePackage[];
