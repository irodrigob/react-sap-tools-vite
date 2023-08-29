import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import ErrorGeneral from "shared/errors/errorGeneral";
import {
  Languages,
  ObjectsText,
  SelectableObjects,
  ResponseSaveObjectText,
} from "sap/translate/infraestructure/types/translate";

export type responseLanguages = Result<Languages> | Result<ErrorGraphql>;
export type responseSelectableObjects =
  | Result<ResponseSaveObjectText>
  | Result<ErrorGraphql>;
