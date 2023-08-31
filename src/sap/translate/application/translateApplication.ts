import { ApolloError } from "@apollo/client";
import { Result } from "shared/core/Result";
import TranslateRepository from "sap/translate/infraestructure/repositories/translateRepository";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import {
  ResponseLanguages,
  ReponseSaveTranslate,
  ResponseSelectableObjects,
  ReponseGetObjectsTranslate,
} from "sap/translate/infraestructure/types/application";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import {
  ObjectsText,
  ParamsObjectTranslate,
} from "sap/translate/infraestructure/types/translate";
export default class TranslateApplication {
  private translateRepository: TranslateRepository;

  constructor() {
    this.translateRepository = new TranslateRepository();
  }
  /**
   * Obtiene los idiomas a traducir
   * @param dataConnection | Datos conexión sistema
   * @returns | Resultado con los idiomas
   */
  async getLanguages(
    dataConnection: DataConnectionSystem
  ): Promise<ResponseLanguages> {
    try {
      let response = await this.translateRepository.getLanguages(
        dataConnection
      );

      return Result.ok(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
  /**
   * Obtiene los objetos que se pueden traducir
   * @param dataConnection | Datos conexión sistema
   * @returns | Resultado con los objetos seleccionables
   */
  async getSelectableObjects(
    dataConnection: DataConnectionSystem
  ): Promise<ResponseSelectableObjects> {
    try {
      let response = await this.translateRepository.getSelectableObjects(
        dataConnection
      );

      return Result.ok(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
  /**
   * Obtiene los textos a traducir del objeto pasado por parámetro
   * @param dataConnection | Datos conexión sistema
   * @param paramsTranslate | Parametros del objeto a traducción
   * @returns | Resultado con las traducciones
   */
  async getObjectTranslate(
    dataConnection: DataConnectionSystem,
    paramsTranslate: ParamsObjectTranslate
  ): Promise<ReponseGetObjectsTranslate> {
    try {
      let response = await this.translateRepository.getObjectTranslate(
        dataConnection,
        paramsTranslate
      );

      return Result.ok(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
  /**
   * Graba los textos traducidos
   * @param dataConnection | Datos conexión sistema
   * @param paramsTranslate | Parametros del objeto a traducción
   * @param ObjectsText | Textos a traducir
   * @returns | Resultado con las traducciones confirmadas y resultado del proceso
   */
  async saveObjectTranslate(
    dataConnection: DataConnectionSystem,
    paramsTranslate: ParamsObjectTranslate,
    objectsText: ObjectsText
  ): Promise<ReponseSaveTranslate> {
    try {
      let response = await this.translateRepository.saveObjectTranslate(
        dataConnection,
        paramsTranslate,
        objectsText
      );

      return Result.ok(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
}
