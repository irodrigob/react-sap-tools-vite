import i18n from "i18next";
import React, { useState, useContext, createContext, FC } from "react";
import { useTranslation } from "react-i18next";

interface i18nContextInterface {
  defaultLanguage: string;
  language: string;
  getI18nText: (sText: string, variables?: object) => string;
}

// El Partial indica que no es necesario indicar todos los valores.
const TranslationContext = createContext<i18nContextInterface>({
  defaultLanguage: "",
  language: "",
  getI18nText: (sText: string, variables?: object): string => {
    return "";
  },
});

interface Props {
  children: React.ReactNode;
}

const I18nProvider: FC<Props> = (props) => {
  const { children } = props;
  const [defaultLanguage, setDefaultLanguage] = useState("es");
  const {
    t,
    i18n: { language },
  } = useTranslation();

  /*************************************
   * Funciones
   ************************************/
  /**
   *
   * @param {string} sText - Identificar del texto
   * @param {object} variables - Objeto con las variables. Ejemplo: { what: 'i18next', how: 'great' }
   * En el archivo de traducción se pondría: "key": "{{what}} is {{how}}"
   * @returns {string} - Texto
   */
  const getI18nText = (sText: string, variables: object = {}): string => {
    return t(sText, variables);
  };

  return (
    <TranslationContext.Provider
      value={{ defaultLanguage, language, getI18nText }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export default I18nProvider;

export const useTranslations = () => useContext(TranslationContext);
