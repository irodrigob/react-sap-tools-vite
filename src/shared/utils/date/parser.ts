import { A } from "./types.d";

type parserReturn = {
  value: number;
  length: number;
};
interface DateTimeParserInterface {
  [key: string]: (d: string) => parserReturn;
}

/**
 * Ejecuta la expresión regular para el parseo
 * @param re | Expresion regular
 * @param str | string donde se aplica
 * @returns | Estructura con el resultado
 */
const exec = (re: RegExp, str: string): parserReturn => {
  let result = (re.exec(str) || [""])[0];
  return { value: Number(result), length: result.length };
};

/**
 * Busca el valor en un array
 * @param array | Array de valores
 * @param str | String a buscar
 * @returns | Estructura con el resultado
 */
export const find = (array: string[], str: string): parserReturn => {
  var index = -1,
    length = 0;

  for (var i = 0, len = array.length, item; i < len; i++) {
    item = array[i];
    if (!str.indexOf(item) && item.length > length) {
      index = i;
      length = item.length;
    }
  }
  return { value: index, length: length };
};

export default class DateTimeParsers {
  /**
   * Busca el valor en un array
   * @param array | Array de valores
   * @param str | String a buscar
   * @returns | Estructura con el resultado
   */
  find = (array: string[], str: string): parserReturn => {
    var index = -1,
      length = 0;

    for (var i = 0, len = array.length, item; i < len; i++) {
      item = array[i];
      if (!str.indexOf(item) && item.length > length) {
        index = i;
        length = item.length;
      }
    }
    return { value: index, length: length };
  };
  /**
   * Devuelve el parsers de fecha y hora
   * @returns Objeto con las funciones de parseo
   */
  parser(): DateTimeParserInterface {
    return {
      YYYY: (str: string) => {
        return exec(/^\d{4}/, str);
      },
      Y: (str: string) => {
        return exec(/^\d{1,4}/, str);
      },
      MM: (str: string) => {
        return exec(/^\d\d/, str);
      },
      M: (str: string) => {
        return exec(/^\d\d?/, str);
      },
      DD: (str: string) => {
        return exec(/^\d\d/, str);
      },
      D: (str: string) => {
        return exec(/^\d\d?/, str);
      },
      HH: (str: string) => {
        return exec(/^\d\d/, str);
      },
      H: (str: string) => {
        return exec(/^\d\d?/, str);
      },
      hh: (str: string) => {
        return exec(/^\d\d/, str);
      },
      h: (str: string) => {
        return exec(/^\d\d?/, str);
      },
      mm: (str: string) => {
        return exec(/^\d\d/, str);
      },
      m: (str: string) => {
        return exec(/^\d\d?/, str);
      },
      ss: (str: string) => {
        return exec(/^\d\d/, str);
      },
      s: (str: string) => {
        return exec(/^\d\d?/, str);
      },
      SSS: (str: string) => {
        return exec(/^\d{1,3}/, str);
      },
      SS: (str: string) => {
        var result = exec(/^\d\d?/, str);
        result.value *= 10;
        return result;
      },
      S: (str: string) => {
        var result = exec(/^\d/, str);
        result.value *= 100;
        return result;
      },
      ZZ: (str: string) => {
        var arr = /^([+-])(\d{2}):([0-5]\d)/.exec(str) || ["", "", "", ""];
        return {
          value:
            0 -
            (((Number(arr[1]) + Number(arr[2])) | 0) * 60 +
              ((Number(arr[1]) + Number(arr[3])) | 0)),
          length: arr[0].length,
        };
      },
      A: (str: string) => {
        return this.find(A, str);
      },
    };
  }
  /**
   * Devuelve la hora en formato 24 horas
   * @param h Hora
   * @param a 24/12 hora
   * @returns Hora en formato 24h
   */
  h12(h: number, a: number) {
    return (h === 12 ? 0 : h) + a * 12;
  }
}
