import { useNavigate } from "react-router-dom";
import AdtIdeContainer from "./adtIde/adtIdeContainer";
import { useAppSelector } from "shared/storage/useStore";
import { useEffect } from "react";

export default function MainAdt() {
	const navigate = useNavigate();
	const { systemSelected, connectedToSystem } = useAppSelector(
		(state) => state.System
	);

	useEffect(() => {
		if (!connectedToSystem) navigate("/");
	}, [connectedToSystem]);

	return <>{systemSelected.name && <AdtIdeContainer />}</>;
}
