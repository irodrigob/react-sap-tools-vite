import { FC, useEffect, useState } from "react";
import {
  DynamicPage,
  DynamicPageHeader,
  FlexibleColumnLayout,
  FCLLayout,
} from "@ui5/webcomponents-react";
import FiltersOrdersTable from "sap/transportOrder/infraestructure/frontend/components/filtersOrdersTable/filtersOrdersTable";
import useTransportOrder from "sap/transportOrder/infraestructure/frontend/hooks/useTransportOrder";
import OrdersTreeTable from "./ordersTreeTable";
import { useAppSelector } from "shared/storage/useStore";
import OrderObjectsContainer from "sap/transportOrder/infraestructure/frontend/components/orderObjects/orderObjectsContainer";

const TransportOrderContainer: FC = () => {

  const { systemSelected } = useAppSelector((state) => state.System);
  const { loadInitialData } = useTransportOrder();
  const { showOrderObjects } = useAppSelector(
    (state) => state.SAPTransportOrder
  );
  const { systemChanged } = useAppSelector(
    (state) => state.SAPGeneral
  );
  const [layout, setLayout] = useState(FCLLayout.OneColumn);

  useEffect(() => {
    if (systemSelected.name && systemChanged) {
      loadInitialData();
    }
  }, [systemSelected, systemChanged]);

  useEffect(() => {
    setLayout(
      showOrderObjects ? FCLLayout.TwoColumnsMidExpanded : FCLLayout.OneColumn
    );
  }, [showOrderObjects]);

  return (
    <FlexibleColumnLayout
      layout={layout}
      id="flexibleTransportOrderContainer"
      startColumn={
        <div>
          <DynamicPage
            showHideHeaderButton={true}
            headerContentPinnable={false}
            headerContent={
              <DynamicPageHeader>
                <FiltersOrdersTable />
              </DynamicPageHeader>
            }
            style={{
              paddingLeft: "0px",
              paddingRight: "0px",
            }}
          />

          <OrdersTreeTable />
        </div>
      }
      midColumn={
        <div>
          <OrderObjectsContainer />
        </div>
      }
    />
  );
};

export default TransportOrderContainer;
