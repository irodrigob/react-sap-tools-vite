import { FC } from "react";
import { AnalyticalTable } from "@ui5/webcomponents-react";
import useOrderObjectsTable from "sap/transportOrder/infraestructure/frontend/hooks/useOrderObjectsTable";
import ToolbarTable from "./toolbarTable";
import { useTranslations } from "translations/i18nContext";
import PopupMoveObjects from "./moveObjects/popupMoveObjects";
import ConfirmDeleteOrderObject from "sap/transportOrder/infraestructure/frontend/components/orderObjects/confirmDeleteOrderObject";

const OrderObjectsTable: FC = () => {
  const {
    orderObjectsTable,
    columnsTable,
    textSearch,
    setTextSearch,
    handlerRowSelected,
    objectsSelected,
    setObjectsSelected,
    openMoveObjects,
    setOpenMoveObjects,
    openDeleteObjects,
    setOpenDeleteObjects,
    handlerReloadObjects,
    handlerDeleteObjects,
  } = useOrderObjectsTable();
  const { getI18nText } = useTranslations();

  return (
    <>
      <AnalyticalTable
        columns={columnsTable}
        header={
          <ToolbarTable
            textSearch={textSearch}
            setTextSearch={setTextSearch}
            reloadObjectOrders={handlerReloadObjects}
            objectsSelected={objectsSelected}
            setObjectsSelected={setObjectsSelected}
            setOpenMoveObjects={setOpenMoveObjects}
            setOpenDeleteObjects={setOpenDeleteObjects}
          />
        }
        selectionMode="MultiSelect"
        selectionBehavior="RowSelector"
        data={orderObjectsTable}
        filterable={true}
        noDataText={getI18nText("transportOrder.orderObjects.noDataText")}
        onRowSelect={(event: any) => {
          handlerRowSelected(event);
        }}
      />
      {objectsSelected.length > 0 && (
        <>
          {/* uso la variable opnMoveObjects para que no se llame al componentes hasta que no se indique. Ya que al renderizar
        el componente principal me esta renderizado y entrando en procesos de lectura que no quiere que entre hasta que se muestre el componente*/}
          {openMoveObjects && (
            <PopupMoveObjects
              objectsSelected={objectsSelected}
              open={openMoveObjects}
              onClose={() => {
                setOpenMoveObjects(false);
              }}
            />
          )}

          <ConfirmDeleteOrderObject
            open={openDeleteObjects}
            onClose={() => {
              setOpenDeleteObjects(false);
            }}
            onConfirm={() => {
              handlerDeleteObjects();
            }}
          />
        </>
      )}
    </>
  );
};

export default OrderObjectsTable;
