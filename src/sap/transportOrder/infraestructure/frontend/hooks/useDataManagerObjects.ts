import { useCallback } from "react";
import {
  OrderObjectsKey,
  OrderObjectsTable,
} from "sap/transportOrder/infraestructure/types/transport";
import Object from "sap/transportOrder/domain/entities/object";
import { useAppSelector } from "shared/storage/useStore";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";

export default function useDataManagerObjects() {
  const { orderObjects } = useAppSelector((state) => state.SAPTransportOrder);
  const sapTransportOrderActions = new SAPTransportOrderActions();

  /**
   * Filtra los objetos a partir de un texto
   * @param values | Array de valores
   * @param textSearch | Texto a buscar
   */
  const searchObjectsTable = useCallback(
    (values: OrderObjectsTable, textSearch: string): OrderObjectsTable => {
      if (textSearch == "") {
        return values;
      } else {
        let newValues: OrderObjectsTable = [];
        values.forEach((row) => {
          if (searchTextRowObject({ ...row }, textSearch)) newValues.push(row);
        });

        return newValues;
      }
    },
    []
  );

  /**
   * Búsqueda por texto en el registro de objetos
   * @param row | Fila con los datos del objeto
   * @param text | Texto a buscar
   * @returns Boolean si existe o no el texto
   */
  const searchTextRowObject = useCallback(
    (row: Object, text: string): boolean => {
      let textUpper = text.toUpperCase().trim();
      if (
        row.pgmid.includes(textUpper) ||
        row.objName.includes(textUpper) ||
        row.object.includes(textUpper) ||
        row.objectDesc.toUpperCase().includes(textUpper)
      )
        return true;
      else return false;
    },
    []
  );

  /**
   * Borrado de objetos en el modelo
   * @param objects | Array con los objetos en el modelo
   */
  const deleteObjectsModel = useCallback(
    (objects: OrderObjectsKey): void => {
      let newOrderObjects = structuredClone(orderObjects);

      objects.forEach((object) => {
        let objectModel = newOrderObjects.find(
          (row) => row.order == object.order
        );
        if (objectModel) {
          let indexObject = objectModel.objects.findIndex(
            (row) =>
              row.pgmid == object.pgmid &&
              row.object == object.object &&
              row.objName == object.objName
          );

          objectModel.objects.splice(indexObject, indexObject >= 0 ? 1 : 0);
        }
      });
      sapTransportOrderActions.setOrderObjects(newOrderObjects);
    },
    [orderObjects]
  );

  return { searchObjectsTable, deleteObjectsModel };
}
