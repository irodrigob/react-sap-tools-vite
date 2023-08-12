import ErrorBase from "./ErrorBase";

export default class ErrorGeneral extends ErrorBase {
  /**
   * Crear un mensaje general indicandole el texto
   * @param message | Texto del mensaje
   * @returns | Clases con el mensaje de error
   */
  static create(message: string) {
    return new ErrorGeneral({ singleMessage: message });
  }
  static createI18n(i18nText: string) {
    return new ErrorGeneral({ i18nText: i18nText });
  }
}
