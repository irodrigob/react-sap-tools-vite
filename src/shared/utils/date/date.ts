import dateTimeFormatters from "./formatters";
import DateTimeParsers, { find as findPattern } from "./parser";

interface DateTimeComponents {
  [key: string]: number;
}
/**
 * Clase con utilidades de fecha y hora.
 * Código basado en la librería: https://github.com/knowledgecode/date-and-time, pero
 * adaptado para que funcione en typescript
 */

export default class DateUtils {
  private parsers: DateTimeParsers;
  constructor() {
    this.parsers = new DateTimeParsers();
  }
  /**
   * Transforma una fecha pasada con un formato determinado a otro formato
   * @param dateString | Fecha
   * @param arg1 | formato de la fecha
   * @param arg2 | formato a convertir
   * @param utc | salida en UTC
   * @return fecha formateada
   */
  transform(dateString: string, arg1: string, arg2: string, utc?: boolean) {
    return this.format(this.parse(dateString, arg1), arg2, utc);
  }
  /**
   * formatea una fecha a string, segun el formato pasado
   * @param dateObj | Fecha
   * @param formatter | Formato
   * @param utc | Salida como UTC
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
      str += dateTimeFormatters[pattern]
        ? dateTimeFormatters[pattern](d)
        : pattern.replace(/\[(.*)]/, "$1");
    });

    return str;
  }

  /**
   * Transforma una fecha string a objeto fecha
   * @param dateString Fecha
   * @param arg formato de la fecha
   * @param utc Salida en UTC
   * @returns Objeto fecha
   */
  parse(dateString: string, arg: string, utc?: boolean): Date {
    let dt = this.preparse(dateString, arg);
    let patterns = this.compile(arg);

    if (this.isValid(dt)) {
      dt.M -= dt.Y < 100 ? 22801 : 1; // 22801 = 1900 * 12 + 1
      if (utc || ~findPattern(patterns, "ZZ").value) {
        return new Date(
          Date.UTC(dt.Y, dt.M, dt.D, dt.H, dt.m + dt.Z, dt.s, dt.S)
        );
      }
      return new Date(dt.Y, dt.M, dt.D, dt.H, dt.m, dt.s, dt.S);
    }
    return new Date(NaN);
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
  /**
   * Extrae las partes del formato
   * @param formatString | formato
   * @returns Array con el formato separado en un array
   */
  protected compile(formatString: string): string[] {
    let re = /\[([^[\]]|\[[^[\]]*])*]|([A-Za-z])\2+|\.{3}|./g;
    let keys;
    let pattern = [];

    while ((keys = re.exec(formatString))) {
      pattern[pattern.length] = keys[0];
    }
    return pattern;
  }
  /**
   * Realiza el pre-parse de la fecha en base al formato pasado
   * @param dateString | Fecha
   * @param arg | Formato de la fecha
   * @returns Estructura con los datos de la fecha pasada
   */
  protected preparse(dateString: string, arg: string): DateTimeComponents {
    // Patron que se aplicará
    let patterns = typeof arg === "string" ? this.compile(arg) : arg;
    let dt: DateTimeComponents = {
      Y: 1970,
      M: 1,
      D: 1,
      H: 0,
      A: 0,
      h: 0,
      m: 0,
      s: 0,
      S: 0,
      Z: 0,
      _index: 0,
      _length: 0,
      _match: 0,
    };
    let comment = /\[(.*)]/;
    let offset = 0;

    patterns.forEach((pattern) => {
      if (this.parsers.parser()[pattern]) {
        let result = this.parsers.parser()[pattern](dateString.slice(offset));
        if (result.length) {
          offset += result.length;
          dt[pattern.charAt(0)] = result.value;
          dt._match++;
        }
      } else if (pattern === dateString.charAt(offset) || pattern === " ") {
        offset++;
      } else if (
        comment.test(pattern) &&
        !dateString.slice(offset).indexOf(comment.exec(pattern)![1])
      ) {
        offset += pattern.length - 2;
      } else if (pattern === "...") {
        offset = dateString.length;
      }
    });
    dt.H = dt.H || this.parsers.h12(dt.h, dt.A);
    dt._index = offset;
    dt._length = dateString.length;
    return dt;
  }
  /**
   * Devuelve si el año es bisiesto
   * @param y | Año
   * @returns Booleano si es bisiesto
   */
  protected isLeapYear = (y: number) => {
    return (!(y % 4) && !!(y % 100)) || !(y % 400);
  };
  /**
   * Devuelve si la fecha en componentes es valida
   * @param dt | Fecha en componentes
   * @returns booleano si la fecha es valida
   */
  protected isValid = (dt: DateTimeComponents) => {
    let last = [
      31,
      (28 + Number(this.isLeapYear(dt.Y))) | 0,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ][dt.M - 1];

    return !(
      dt._index < 1 ||
      dt._length < 1 ||
      dt._index - dt._length ||
      dt._match < 1 ||
      dt.Y < 1 ||
      dt.Y > 9999 ||
      dt.M < 1 ||
      dt.M > 12 ||
      dt.D < 1 ||
      dt.D > last ||
      dt.H < 0 ||
      dt.H > 23 ||
      dt.m < 0 ||
      dt.m > 59 ||
      dt.s < 0 ||
      dt.s > 59 ||
      dt.S < 0 ||
      dt.S > 999 ||
      dt.Z < -840 ||
      dt.Z > 720
    );
  };
}
