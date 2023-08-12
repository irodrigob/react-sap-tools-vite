export default class ArrayUtils {
  /**
   * Agrupa los valores de un array por una determinado campo
   * Nota: Este método lo he sacado de aquí: https://upmostly.com/typescript/implementing-groupby-in-typescript
   * @param arr Array con los valores
   * @param fn Función que determina el campo por el cual agrupar
   * @returns Array con la agrupación
   */
  static groupBy<T>(arr: T[], fn: (item: T) => any) {
    return arr.reduce<Record<string, T[]>>((prev, curr) => {
      const groupKey = fn(curr);
      const group = prev[groupKey] || [];
      group.push(curr);
      return { ...prev, [groupKey]: group };
    }, {});
  }
}
