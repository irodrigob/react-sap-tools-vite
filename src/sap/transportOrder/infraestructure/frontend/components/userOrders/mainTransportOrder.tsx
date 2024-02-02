import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TransportOrderContainer from "./transportOrderContainer";
import { useAppSelector } from "shared/storage/useStore";

export default function MainTransportOrder() {
	const navigate = useNavigate();
	const { systemSelected, connectedToSystem } = useAppSelector(
		(state) => state.System
	);

	useEffect(() => {
		if (!connectedToSystem) navigate("/");
	}, [connectedToSystem]);

	return <>{systemSelected.name && <TransportOrderContainer />}</>;
}
