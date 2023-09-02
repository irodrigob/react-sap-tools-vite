import TranslateContainer from "./translateContainer";
import TileSystemListContainer from "systems/infraestructure/frontend/components/tileSystemList/tileSystemListContainer";
import { useAppSelector } from "shared/storage/useStore";

export default function MainTranslate() {
    const { systemSelected } = useAppSelector((state) => state.System);

    return (
        <>
            {systemSelected.name && <TranslateContainer />}
            {!systemSelected.name && <TileSystemListContainer />}
        </>
    );
}