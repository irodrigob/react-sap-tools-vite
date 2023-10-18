import { useEffect } from "react";
import { useAppSelector } from "shared/storage/useStore";
import useOrderObjects from "sap/transportOrder/infraestructure/frontend/hooks/useOrderObjects";
import OrderObjectsTable from "sap/transportOrder/infraestructure/frontend/components/orderObjects/orderObjectsTable";

export default function OrderObjectsContainer() {
  const { ordersObjectsSelected } = useAppSelector(
    (state) => state.SAPTransportOrder
  );
  const { loadOrderObjects, loadingObjects } = useOrderObjects();

  useEffect(() => {
    loadOrderObjects(
      ordersObjectsSelected.map((row) => {
        return { order: row.order };
      })
    );
  }, [ordersObjectsSelected]);

  return (
    <>
      <OrderObjectsTable loadingOrderObjects={loadingObjects} />
    </>
  );
}
