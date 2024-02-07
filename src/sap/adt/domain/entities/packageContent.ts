export type AdtPackageObject = {
	objectName: string;
	techName: string;
	objectUri: string;
};
export type AdtPackageObjects = AdtPackageObject[];

export type AdtPackageObjectType = {
	objectType: string;
	objectTypeDesc: string;
	objects: AdtPackageObjects;
};
export type AdtPackageObjectTypes = AdtPackageObjectType[];

export type AdtPackageCategory = {
	category: string;
	categoryDesc: string;
	objectTypes: AdtPackageObjectTypes;
};
export type AdtPackageCategories = AdtPackageCategory[];

export type AdtPackageContent = {
	level: number;
	objectType: string;
	objectTypeDesc: string;
	objectName: string;
	objectNameParent: string;
	techName: string;
	categories: AdtPackageCategories;
};

export type AdtPackageContents = AdtPackageContent[];
