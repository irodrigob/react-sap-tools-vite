import AppsList from "sap/general/domain/entities/appsList";
import UserInfo from "sap/general/domain/entities/userInfo";
import { metadataDTO } from "sap/general/infraestructure/dto/metadataDTO";
import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import ErrorGeneral from "shared/errors/errorGeneral";

export type ResponseMetadata =
	| Result<metadataDTO>
	| Result<ErrorGeneral>
	| Result<ErrorGraphql>;

export type ResponseExecuteServicesSystemSelect =
	| Result<void>
	| Result<ErrorGeneral>
	| Result<ErrorGraphql>;

export type ResponseGetUserInfoRepo =
	| Result<UserInfo>
	| Result<ErrorGeneral>
	| Result<ErrorGraphql>;

export type ResponseGetAppsList =
	| Result<AppsList[]>
	| Result<ErrorGeneral>
	| Result<ErrorGraphql>;
