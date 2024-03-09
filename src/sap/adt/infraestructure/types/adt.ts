import {
	ADTFavoritePackage,
	ADTFavoritePackages,
} from "sap/adt/domain/entities/favoritePackage";
import { ADTSearchObjects } from "sap/adt/domain/entities/searchObject";
import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import ErrorGeneral from "shared/errors/errorGeneral";
import {
	AdtPackageContents,
	AdtPackageObject,
} from "sap/adt/domain/entities/packageContent";
import { ADTObjectStructure } from "sap/adt/domain/entities/objectStructure";
import { ADTClassContent } from "sap/adt/domain/entities/classContent";

export enum ADTObjectVersion {
	active = "active",
	inactive = "inactive",
}
export type PackageContentStorage = {
	packageName: string;
	content: AdtPackageContents;
};

export type ADTObjectInfoEditor = {
	packageName: string;
	category: string;
	objectType: string;
	objectTypeDesc: string;
	object: AdtPackageObject;
};
export type ADTObjectContent = ADTClassContent;
export type ADTObjectEditor = {
	objectInfo: ADTObjectInfoEditor;
	objectKey: string;
	loadingContent: boolean;
	loadingStructure: boolean;
	objectContent?: ADTObjectContent;
	objectStructure?: ADTObjectStructure;
	sectionSource?: string;
};
export type ADTObjectsEditor = ADTObjectEditor[];

export type ResponseSearchObject =
	| Result<ADTSearchObjects>
	| Result<ErrorGeneral>
	| Result<ErrorGraphql>;

export type ResponseAddFavoritePackage =
	| Result<ADTFavoritePackage>
	| Result<ErrorGeneral>
	| Result<ErrorGraphql>;

export type ResponseDeleteFavoritePackage =
	| Result<ADTFavoritePackage>
	| Result<ErrorGeneral>
	| Result<ErrorGraphql>;

export type ResponseFavoritePackages =
	| Result<ADTFavoritePackages>
	| Result<ErrorGeneral>
	| Result<ErrorGraphql>;

export type ResponsePackageContent =
	| Result<AdtPackageContents>
	| Result<ErrorGeneral>
	| Result<ErrorGraphql>;

export type ResponseAdtObjectContent =
	| Result<ADTClassContent | undefined>
	| Result<ErrorGeneral>
	| Result<ErrorGraphql>;

export type ResponseObjectStructure =
	| Result<ADTObjectStructure>
	| Result<ErrorGeneral>
	| Result<ErrorGraphql>;
