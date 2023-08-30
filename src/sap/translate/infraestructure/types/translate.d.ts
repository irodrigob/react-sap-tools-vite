import Language from "sap/translate/domain/entities/language.d";
import SelectableObject from "sap/translate/domain/entities/selectableObjects.d";
import ObjectText from "sap/translate/domain/entities/objectText.d";
import ObjectTextToSaveDTO from "./setObjectTextDTO";
import { ReturnDTO } from "shared/dto/generalDTO";

export type Languages = Language[];
export type SelectableObjects = SelectableObject[];
export type ObjectsText = ObjectText[];
export type ResponseSaveObjectText = {
  objectText: ObjectsText;
  return: ReturnDTO;
};
export type ParamsObjectTranslate = {
  object: string;
  objectName: string;
  oLang: string;
  tLang: [string];
  order: string;
  depthRefs: number;
};
