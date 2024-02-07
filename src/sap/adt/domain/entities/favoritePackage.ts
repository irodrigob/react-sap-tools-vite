import { AdtPackageContents } from "sap/adt/domain/entities/packageContent";

export type ADTFavoritePackage = {
	_id: string;
	packageName: string;
	content: AdtPackageContents;
};
export type ADTFavoritePackages = ADTFavoritePackage[];
