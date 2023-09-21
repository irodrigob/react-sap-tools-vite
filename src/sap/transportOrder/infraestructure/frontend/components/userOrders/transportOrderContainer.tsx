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
import { APP } from "sap/transportOrder/infraestructure/utils/constants/constantsTransportOrder";

const TransportOrderContainer: FC = () => {

  const { loadInitialData } = useTransportOrder();
  const { showOrderObjects } = useAppSelector(
    (state) => state.SAPTransportOrder
  );
  const { systemChanged, applicationChanged } = useAppSelector(
    (state) => state.SAPGeneral
  );
  const [layout, setLayout] = useState(FCLLayout.OneColumn);

  useEffect(() => {
    // Verifico por sistma o cambio de aplicación leer los datos del proceso.
    if (systemChanged || applicationChanged) {
      loadInitialData();
    }
  }, [systemChanged, applicationChanged]);

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
