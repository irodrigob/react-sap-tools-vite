import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import ErrorGeneral from "shared/errors/errorGeneral";
import TunnelProvider from "tunnelSystem/domain/entities/provider";

export type responseTunnelRepoArray = Result<Tunnel[]> | Result<ErrorGraphql>;
export type responseTunnelConfigRepo =
  | Result<TunnelConfiguration>
  | Result<ErrorGraphql>;
export type responseTunnelProviderRepoArray =
  | Result<TunnelProvider[]>
  | Result<ErrorGraphql>;
export type responseTunnelFromHost =
  | Result<string>
  | Result<ErrorGeneral>
  | Result<ErrorGraphql>;
