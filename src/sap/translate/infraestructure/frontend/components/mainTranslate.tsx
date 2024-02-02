import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TranslateContainer from "./translateContainer";
import { useAppSelector } from "shared/storage/useStore";

export default function MainTranslate() {
	const navigate = useNavigate();
	const { systemSelected, connectedToSystem } = useAppSelector(
		(state) => state.System
	);

	useEffect(() => {
		if (!connectedToSystem) navigate("/");
	}, [connectedToSystem]);

	return <>{systemSelected.name && <TranslateContainer />}</>;
}
