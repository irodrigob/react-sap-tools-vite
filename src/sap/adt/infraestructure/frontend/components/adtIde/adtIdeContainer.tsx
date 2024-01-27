import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect } from "react";
import FavoritePackagesContainer from "sap/adt/infraestructure/frontend/components/favoritePackages/favoritePackagesContainer";
import { useAppSelector } from "shared/storage/useStore";
import useAdt from "sap/adt/infraestructure/frontend/hooks/useAdt";

export default function AdtIdeContainer() {
	const { systemChanged, applicationChanged } = useAppSelector(
		(state) => state.SAPGeneral
	);
	const { loadInitialData } = useAdt();

	useEffect(() => {
		if (systemChanged || applicationChanged) {
			loadInitialData();
		}
	}, [systemChanged, applicationChanged]);

	return (
		<ResizablePanelGroup direction="horizontal">
			<ResizablePanel defaultSize={20}>
				<FavoritePackagesContainer />
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel>
				<p>Codigo</p>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
