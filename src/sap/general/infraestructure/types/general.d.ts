import { metadataDTO } from "sap/general/infraestructure/dto/metadataDTO";

export type responseMetadata =
  | Result<metadataDTO>
  | Result<ErrorGeneral>
  | Result<ErrorGraphql>;

export type responseExecuteServicesSystemSelect =
  | Result<void>
  | Result<ErrorGeneral>
  | Result<ErrorGraphql>;

export type responseGetUserInfoRepo =
  | Result<UserInfo>
  | Result<ErrorGeneral>
  | Result<ErrorGraphql>;

export type responseGetAppsList =
  | Result<AppsList[]>
  | Result<ErrorGeneral>
  | Result<ErrorGraphql>;
