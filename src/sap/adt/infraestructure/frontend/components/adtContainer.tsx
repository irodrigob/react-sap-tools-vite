import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect } from "react";
import FavoritePackagesContainer from "sap/adt/infraestructure/frontend/components/favoritePackages/favoritePackagesContainer";
import { useAppSelector } from "shared/storage/useStore";
import useAdt from "sap/adt/infraestructure/frontend/hooks/useAdt";
import EditorAreaContainer from "./editorArea/editorAreaContainer";

export default function AdtContainer() {
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
		<ResizablePanelGroup
			direction="horizontal"
			style={{ height: "95vh" }}
		>
			<ResizablePanel defaultSize={30}>
				<FavoritePackagesContainer />
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel>
				<EditorAreaContainer />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
