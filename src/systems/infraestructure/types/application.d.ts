import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import ErrorGeneral from "shared/errors/errorGeneral";

export type responseSystemRepoArray = Result<System[]> | Result<ErrorGraphql>;
export type responseSystemRepo = Result<System> | Result<ErrorGraphql>;
export type responseNewSystemRepo = Result<System> | Result<ErrorGraphql>;
export type responseBuildURLConnect =
  | Result<string>
  | Result<ErrorGraphql>
  | Result<ErrorGeneral>;
