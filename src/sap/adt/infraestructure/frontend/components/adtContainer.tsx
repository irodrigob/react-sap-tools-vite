import { useNavigate } from "react-router-dom";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect } from "react";
import FavoritePackagesContainer from "sap/adt/infraestructure/frontend/components/favoritePackages/favoritePackagesContainer";
import { useAppSelector } from "shared/storage/useStore";
import useAdt from "sap/adt/infraestructure/frontend/hooks/useAdt";

export default function AdtContainer() {
	const { systemChanged, applicationChanged } = useAppSelector(
		(state) => state.SAPGeneral
	);
	const { loadInitialData } = useAdt();
	const navigate = useNavigate();
	const { systemSelected, connectedToSystem } = useAppSelector(
		(state) => state.System
	);

	useEffect(() => {
		if (systemChanged || applicationChanged) {
			loadInitialData();
		}
	}, [systemChanged, applicationChanged, connectedToSystem]);

	return (
		<ResizablePanelGroup direction="horizontal">
			<ResizablePanel defaultSize={30}>
				<FavoritePackagesContainer />
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel>
				<p>Codigo</p>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
