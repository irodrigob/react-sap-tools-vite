import { useMemo, useState, useCallback, useEffect } from "react";
import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import { OrderObjectsTable } from "sap/transportOrder/infraestructure/types/transport";
import useDataManagerObjects from "./useDataManagerObjects";
import { useAppSelector } from "shared/storage/useStore";
import OrderObject from "sap/transportOrder/domain/entities/orderObject";
import { useTranslations } from "translations/i18nContext";
import CellOrderLocked from "sap/transportOrder/infraestructure/frontend/components/orderObjects/cellOrderLocked";
import {
  OrderObjectsKey,
  OrderObjectKey,
} from "sap/transportOrder/infraestructure/types/transport";
import useOrderObjects from "sap/transportOrder/infraestructure/frontend/hooks/useOrderObjects";

export default function useOrderObjectsTable() {
  const { orderObjects, ordersObjectsSelected } = useAppSelector(
    (state) => state.SAPTransportOrder
  );
  const { getI18nText } = useTranslations();
  const [textSearch, setTextSearch] = useState("");
  const { searchObjectsTable } = useDataManagerObjects();
  const [objectsSelected, setObjectsSelected] = useState<OrderObjectsKey>([]);
  const [openMoveObjects, setOpenMoveObjects] = useState(false);
  const [openDeleteObjects, setOpenDeleteObjects] = useState(false);
  const { reloadObjectOrders, processDeleteOrderObjects } = useOrderObjects();

  const orderObjectsTable = useMemo(() => {
    let tempObjectsTable: OrderObjectsTable = [];

    if (ordersObjectsSelected.length > 0) {
      ordersObjectsSelected.forEach((row) => {
        let orderObject: OrderObject = orderObjects.find(
          (orderRow) => orderRow.order == row.order
        );
        // Debería de existir porque se añade en base a las ordenes que se seleccionan
        if (orderObject) {
          if (orderObject.objects.length > 0) {
            orderObject.objects.map((object) => {
              tempObjectsTable.push({
                ...object,
                ...orderObject,
                ...row,
              });
            });
          }
        }
      });
    }

    // El filtro de texto lo hago con la tabla ya montada porque lo veo más simple su tratamiento
    if (textSearch == "") return tempObjectsTable;
    else return searchObjectsTable(tempObjectsTable, textSearch);
  }, [orderObjects, ordersObjectsSelected, textSearch]);

  const columnsTable = useMemo(() => {
    let columns: AnalyticalTableColumnDefinition[] = [];
    if (ordersObjectsSelected.length > 1) {
      columns.push(
        {
          Header: getI18nText("transportOrder.tableOrder.labelOrdertask"),
          headerTooltip: getI18nText(
            "transportOrder.tableOrder.labelOrdertask"
          ),
          accessor: "order",
          maxWidth: 140,
        },
        {
          Header: getI18nText("transportOrder.tableOrder.labelDescription"),
          headerTooltip: getI18nText(
            "transportOrder.tableOrder.labelDescription"
          ),
          accessor: "description",
        }
      );
    }

    columns.push(
      {
        Header: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblPgmid"
        ),
        headerTooltip: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblPgmid"
        ),
        accessor: "pgmid",
        maxWidth: 100,
      },
      {
        Header: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblObject"
        ),
        headerTooltip: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblObject"
        ),
        accessor: "object",
        maxWidth: 80,
      },
      {
        Header: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblObjectDesc"
        ),
        headerTooltip: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblObject"
        ),
        accessor: "objectDesc",
        maxWidth: 200,
      },
      {
        Header: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblObjName"
        ),
        headerTooltip: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblObjName"
        ),
        accessor: "objName",
        maxWidth: 600,
      },
      {
        Header: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblLockflag"
        ),
        headerTooltip: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblLockflag"
        ),
        accessor: "lockflag",
        maxWidth: 50,
        Cell: CellOrderLocked,
      },
      {
        Header: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblLanguage"
        ),
        headerTooltip: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblLanguage"
        ),
        accessor: "lang",
        maxWidth: 60,
      }
    );
    return columns;
  }, [ordersObjectsSelected]);

  /**
   * Este efecto me sirve para cuando se borran objetos mire si esta seleccionado
   * y los borre de los registros seleccionados. Y si ha dado algun error no eliminarlo.
   * Esto no puedo hacerlo en el handler de borrado porque el proceso es asincrono
   */
  useEffect(() => {
    // Solo aplica si hay objetos seleccionados
    if (objectsSelected.length > 0) {
      let objectsDeleted: OrderObjectsKey = [];
      objectsSelected.forEach((objectSelected: OrderObjectKey) => {
        if (
          orderObjectsTable.findIndex(
            (row: OrderObjectKey) =>
              row.order == objectSelected.order &&
              row.objName == objectSelected.objName &&
              row.object == objectSelected.object &&
              row.pgmid == objectSelected.pgmid
          ) == -1
        ) {
          objectsDeleted.push(objectSelected);
        }
        if (objectsDeleted.length > 0) setRowSelected(objectsDeleted);
      });
    }
  }, [orderObjectsTable]);

  /**
   * Gestiona el evento cuando seleccionan un registro en la tabla
   * @param event | Evento
   */
  const handlerRowSelected = useCallback(
    (event: any) => {
      let newObjectsSelected = [];
      if (event.detail.row) {
        newObjectsSelected.push({
          order: event.detail.row.original.order,
          pgmid: event.detail.row.original.pgmid,
          object: event.detail.row.original.object,
          objName: event.detail.row.original.objName,
          parent_order: event.detail.row.original.parent_order,
        });
      } else if (event.detail.selectedFlatRows) {
        if (event.detail.selectedFlatRows.length > 0)
          newObjectsSelected = event.detail.selectedFlatRows.map((row: any) => {
            return {
              order: row.original.order,
              pgmid: row.original.pgmid,
              object: row.original.object,
              objName: row.original.objName,
              parent_order: event.detail.row.original.parent_order,
            };
          });
      }
      setRowSelected(newObjectsSelected);
    },
    [objectsSelected]
  );

  /**
   * Se guarda la fila que se ha seleccionado/deseleccionado
   * @param rowsSelected | Filas seleccionadas en la Analytic table
   */
  const setRowSelected = useCallback(
    (rowsSelected: OrderObjectsKey) => {
      if (rowsSelected.length > 0) {
        let newObjectsSelected = [...objectsSelected];
        rowsSelected.forEach((rowSelected) => {
          let tabix = newObjectsSelected.findIndex(
            (row: OrderObjectKey) =>
              row.order == rowSelected.order &&
              row.objName == rowSelected.objName &&
              row.object == rowSelected.object &&
              row.pgmid == rowSelected.pgmid
          );
          if (tabix !== -1)
            newObjectsSelected.splice(tabix, tabix >= 0 ? 1 : 0);
          else newObjectsSelected.push(rowSelected);
        });

        setObjectsSelected(newObjectsSelected);
      } else {
        setObjectsSelected([]);
      }
    },
    [objectsSelected]
  );

  /**
   * Gestiona el proceso de recarga de objetos
   */
  const handlerReloadObjects = useCallback(() => {
    // Se resetean los objetos seleccionados porque al recargar la página se pierden
    // en el componente de SAP.
    setObjectsSelected([]);
    reloadObjectOrders();
  }, [ordersObjectsSelected]);

  /**
   * Gestiona el borrado de objetos
   */
  const handlerDeleteObjects = useCallback(() => {
    // Nota: Hay un useEffect que gestiona los objetos borrados para eliminarlos de la tabla
    // de objetos seleccionados
    processDeleteOrderObjects(objectsSelected);
  }, [ordersObjectsSelected, objectsSelected]);

  return {
    orderObjectsTable,
    columnsTable,
    textSearch,
    setTextSearch,
    handlerRowSelected,
    objectsSelected,
    openMoveObjects,
    setOpenMoveObjects,
    openDeleteObjects,
    setOpenDeleteObjects,
    handlerReloadObjects,
    handlerDeleteObjects,
    setObjectsSelected,
  };
}
