import {
  Languages,
  ObjectsText,
  SelectableObjects,
  ParamsObjectTranslate,
  ResponseSaveObjectText,
} from "sap/translate/infraestructure/types/translate";
import { DataConnectionSystem } from "systems/infraestructure/types/system";

export default interface TranslateRepositoryInterface {
  /**
   * Obtiene los idiomas a traducir
   * @param dataConnection | Datos conexión sistema
   * @returns | Array con los idiomas
   */
  getLanguages(dataConnection: DataConnectionSystem): Promise<Languages>;
  /**
   * Obtiene los objetos que se pueden traducir
   * @param dataConnection | Datos conexión sistema
   * @returns | Array con los objetos
   */
  getSelectableObjects(
    dataConnection: DataConnectionSystem
  ): Promise<SelectableObjects>;
  /**
   * Obtiene los textos a traducir del objeto pasado por parámetro
   * @param dataConnection | Datos conexión sistema
   * @param paramsTranslate | Parametros del objeto a traducción
   * @returns | Array con las traducciones
   */
  getObjectTranslate(
    dataConnection: DataConnectionSystem,
    paramsTranslate: ParamsObjectTranslate
  ): Promise<ObjectsText>;
  /**
   * Graba los textos traducidos
   * @param dataConnection | Datos conexión sistema
   * @param paramsTranslate | Parametros del objeto a traducción
   * @param ObjectsText | Textos a traducir
   * @returns | Array con las traducciones
   */
  saveObjectTranslate(
    dataConnection: DataConnectionSystem,
    paramsTranslate: ParamsObjectTranslate,
    ObjectsText: ObjectsText
  ): Promise<ResponseSaveObjectText>;
}
