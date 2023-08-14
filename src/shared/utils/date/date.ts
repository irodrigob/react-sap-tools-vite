import dateFormatters from "./dateFormatters";
/**
 * Clase con utilidades de fecha y hora.
 * Código basado en la librería: https://github.com/knowledgecode/date-and-time, pero
 * adaptado para que funcione en typescript
 */
export default class DateUtils {
  /**
   * formatea una fecha a string, segun el formato pasado
   * @param dateObj | Fecha
   * @param formatter | Formato
   * @param utc | Calculo como UTC
   */
  format(dateObj: Date, formatter: string, utc?: boolean) {
    // Patron que se aplicará
    let patterns =
      typeof formatter === "string" ? this.compile(formatter) : formatter;
    // Diferencia entre hora local y UTC
    let offset = dateObj.getTimezoneOffset();
    let d = this.addMinutes(dateObj, utc ? offset : 0);
    let str: string = "";

    patterns.forEach((pattern) => {
      str += dateFormatters[pattern]
        ? dateFormatters[pattern](d, pattern)
        : pattern.replace(/\[(.*)]/, "$1");
    });

    console.log(str);

    return str;
  }
  /**
   * Extrae las partes del formato
   * @param formatString | formato
   * @returns Array con el formato separado en un array
   */
  compile(formatString: string): string[] {
    let re = /\[([^[\]]|\[[^[\]]*])*]|([A-Za-z])\2+|\.{3}|./g;
    let keys;
    let pattern = [];

    while ((keys = re.exec(formatString))) {
      pattern[pattern.length] = keys[0];
    }
    return pattern;
  }
  /**
   * Añade o resta días a una fecha
   * @param dateObj | Objeto fecha
   * @param months | Numero de segundos
   * @param utc | Calculo como UTC
   * @returns
   */
  addMonths(dateObj: Date, months: number, utc?: boolean) {
    var d = new Date(dateObj.getTime());

    if (utc) {
      d.setUTCMonth(d.getUTCMonth() + months);
      if (d.getUTCDate() < dateObj.getUTCDate()) {
        return this.addDays(d, -d.getUTCDate(), utc);
      }
    } else {
      d.setMonth(d.getMonth() + months);
      if (d.getDate() < dateObj.getDate()) {
        return this.addDays(d, -d.getDate(), utc);
      }
    }
    return d;
  }
  /**
   * Añade o resta días a una fecha
   * @param dateObj | Objeto fecha
   * @param days | Numero de segundos
   * @param utc | Calculo como UTC
   * @returns
   */
  addDays(dateObj: Date, days: number, utc?: boolean) {
    return this.addHours(dateObj, days * 24, utc);
  }
  /**
   * Añade o resta horas a una fecha
   * @param dateObj | Objeto fecha
   * @param hours | Numero de segundos
   * @param utc | Calculo como UTC
   * @returns
   */
  addHours(dateObj: Date, hours: number, utc?: boolean) {
    return this.addMinutes(dateObj, hours * 60, utc);
  }
  /**
   * Añade o resta minutos a una fecha
   * @param dateObj | Objeto fecha
   * @param minutes | Numero de segundos
   * @param utc | Calculo como UTC
   * @returns
   */
  addMinutes(dateObj: Date, minutes: number, utc?: boolean) {
    return this.addSeconds(dateObj, minutes * 60, utc);
  }
  /**
   * Añade o resta segundos a una fecha
   * @param dateObj | Objeto fecha
   * @param seconds | Numero de segundos
   * @param utc | Calculo como UTC
   * @returns
   */
  addSeconds(dateObj: Date, seconds: number, utc?: boolean) {
    return this.addMilliseconds(dateObj, seconds * 1000, utc);
  }
  /**
   * Añade o resta milisegundos a una fecha
   * @param dateObj | Objeto fecha
   * @param milliseconds | Numero de milisegundos
   * @param utc | Calculo como UTC
   * @returns
   */
  addMilliseconds(dateObj: Date, milliseconds: number, utc?: boolean) {
    var d = new Date(dateObj.getTime());

    if (utc) {
      d.setUTCMilliseconds(d.getUTCMilliseconds() + milliseconds);
    } else {
      d.setMilliseconds(d.getMilliseconds() + milliseconds);
    }
    return d;
  }
}
