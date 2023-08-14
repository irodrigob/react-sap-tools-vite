const dateFormatters = {
  DD: (d: Date) => {
    // Con el 0 inicial hace que devuelva el díanla fecha. Y con el slice -2 hace que
    // elimine todo a partir del segundo digito empezando por el final.
    // Sin el slice sería 014, con el -2 devuelve 14. Si el día fuese 7 devolvería 07.
    return ("0" + d.getDate()).slice(-2);
  },
  D: (d: Date) => {
    return "" + d.getDate();
  },
};
export default dateFormatters;
