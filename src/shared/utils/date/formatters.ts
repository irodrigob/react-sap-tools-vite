import { A } from "./types.d";

interface DateTimeFormattersInterface {
  [key: string]: (d: Date) => string;
}
const dateTimeFormatters: DateTimeFormattersInterface = {
  DD: (d: Date) => {
    // Con el 0 inicial hace que devuelva el díanla fecha. Y con el slice -2 hace que
    // elimine todo a partir del segundo digito empezando por el final.
    // Sin el slice sería 014, con el -2 devuelve 14. Si el día fuese 7 devolvería 07.
    return ("0" + d.getDate()).slice(-2);
  },
  D: (d: Date) => {
    return "" + d.getDate();
  },
  YYYY: (d: Date) => {
    return ("000" + d.getFullYear()).slice(-4);
  },
  YY: (d: Date) => {
    return ("0" + d.getFullYear()).slice(-2);
  },
  Y: (d: Date) => {
    return "" + d.getFullYear();
  },
  MM: (d: Date) => {
    return ("0" + (d.getMonth() + 1)).slice(-2);
  },
  M: (d: Date) => {
    return "" + (d.getMonth() + 1);
  },
  HH: (d: Date) => {
    return ("0" + d.getHours()).slice(-2);
  },
  H: (d: Date) => {
    return "" + d.getHours();
  },
  hh: (d: Date) => {
    return ("0" + (d.getHours() % 12 || 12)).slice(-2);
  },
  h: (d: Date) => {
    return "" + (d.getHours() % 12 || 12);
  },
  mm: (d: Date) => {
    return ("0" + d.getMinutes()).slice(-2);
  },
  m: (d: Date) => {
    return "" + d.getMinutes();
  },
  ss: (d: Date) => {
    return ("0" + d.getSeconds()).slice(-2);
  },
  s: (d: Date) => {
    return "" + d.getSeconds();
  },
  SSS: (d: Date) => {
    return ("00" + d.getMilliseconds()).slice(-3);
  },
  SS: (d: Date) => {
    return ("0" + ((d.getMilliseconds() / 10) | 0)).slice(-2);
  },
  S: (d: Date) => {
    return "" + ((d.getMilliseconds() / 100) | 0);
  },
  ZZ: (d: Date) => {
    var offset = d.getTimezoneOffset();
    var mod = Math.abs(offset);
    return (
      (offset > 0 ? "-" : "+") +
      ("0" + ((mod / 60) | 0)).slice(-2) +
      ":" +
      ("0" + (mod % 60)).slice(-2)
    );
  },
  Z: (d: Date) => {
    var offset = (d.getTimezoneOffset() / 0.6) | 0;
    return (
      (offset > 0 ? "-" : "+") +
      ("000" + Math.abs(offset - (((offset % 100) * 0.4) | 0))).slice(-4)
    );
  },
  A: (d: Date) => {
    return A[Number(d.getHours() > 11) | 0];
  },
};
export default dateTimeFormatters;
