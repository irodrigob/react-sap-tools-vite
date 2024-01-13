import {
	ADTFavoritePackage,
	ADTFavoritePackages,
} from "sap/adt/domain/entities/favoritePackage";
import { ADTSearchObjects } from "sap/adt/domain/entities/searchObject";
import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import ErrorGeneral from "shared/errors/errorGeneral";

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
