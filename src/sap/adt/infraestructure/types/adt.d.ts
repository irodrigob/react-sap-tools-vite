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
import { ADTClassContent } from "sap/adt/domain/entities/classContent";

export type ADTObjectVersion = "active" | "inactive";
export type PackageContentStorage = {
	packageName: string;
	content: AdtPackageContents;
};

export type ADTObjectOpenEditor = {
	packageName: string;
	category: string;
	objectType: string;
	objectTypeDesc: string;
	object: AdtPackageObject;
	loadingContent: boolean;
	objectContent?: ADTClassContent;
};
export type ADTObjectsOpenEditor = ADTObjectOpenEditor[];

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
