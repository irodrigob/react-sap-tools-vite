import { FC } from "react";
import { useTranslations } from "translations/i18nContext";
import { AnalyticalTable } from "@ui5/webcomponents-react";
import ToolbarTable from "./toolbarTable";
import useOrdersTreeTable from "sap/transportOrder/infraestructure/frontend/hooks/useOrdersTreeTable";
import ConfirmDeleteOrder from "sap/transportOrder/infraestructure/frontend/components/userOrders/confirmDeleteOrder";

const OrdersTreeTable: FC = () => {
  const { getI18nText } = useTranslations();

  const {
    columnsTreeTable,
    expandedRows,
    setRowSelected,
    loadingOrders,
    autoResetExpanded,
    ordersTreeTable,
  } = useOrdersTreeTable();

  /*************************************
   * Memo
   ************************************/

  return (
    <>
      <AnalyticalTable
        header={<ToolbarTable />}
        columns={columnsTreeTable}
        data={ordersTreeTable}
        isTreeTable={true}
        filterable={true}
        loading={loadingOrders}
        visibleRowCountMode="Auto"
        noDataText={getI18nText("transportOrder.noData")}
        reactTableOptions={{
          initialState: {
            expanded: expandedRows,
          },
          autoResetExpanded: autoResetExpanded,
        }}
        selectionMode="MultiSelect"
        selectionBehavior="RowSelector"
        onRowExpandChange={(event: any) => {
          //setRowExpanded(event.detail.row.original);
          // console.log(event);
        }}
        onRowSelect={(event: any) => {
          if (event.detail.row) {
            setRowSelected([{ ...event.detail.row.original }]);
          } else if (event.detail.selectedFlatRows) {
            let objectSelected = [];
            if (event.detail.selectedFlatRows.length > 0)
              objectSelected = event.detail.selectedFlatRows.map((row: any) => {
                return row.original;
              });

            setRowSelected(objectSelected);
          }
        }}
      />

      <ConfirmDeleteOrder />
    </>
  );
};

export default OrdersTreeTable;
