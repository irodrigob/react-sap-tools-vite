import { FC } from "react";
import TransportOrderContainer from "./transportOrderContainer";
import TileSystemListContainer from "systems/infraestructure/frontend/components/tileSystemList/tileSystemListContainer";
import { useAppSelector } from "shared/storage/useStore";
export default function MainTransportOrder() {
  const { systemSelected } = useAppSelector((state) => state.System);

  return (
    <>
      {systemSelected.name && <TransportOrderContainer />}
      {!systemSelected.name && <TileSystemListContainer />}
    </>
  );
}
