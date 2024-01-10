
import TileSystemListContainer from "systems/infraestructure/frontend/components/tileSystemList/tileSystemListContainer";
import AdtIdeContainer from "./adtIde/adtIdeContainer";
import { useAppSelector } from "shared/storage/useStore";

export default function MainAdt() {
    const { systemSelected } = useAppSelector((state) => state.System);

    return (
        <>
            {systemSelected.name && <AdtIdeContainer />}
            {!systemSelected.name && <TileSystemListContainer />}
        </>
    );
}