import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect } from "react";
import FavoritePackagesContainer from "sap/adt/infraestructure/frontend/components/favoritePackages/favoritePackagesContainer";
import { useAppSelector } from "shared/storage/useStore";
import useAdt from "sap/adt/infraestructure/frontend/hooks/useAdt";
import EditorAreaContainer from "sap/adt/infraestructure/frontend/components/editorArea/editorAreaContainer";
import OutlineObjectContainer from "@/sap/adt/infraestructure/frontend/components/outline/outlineObjectContainer";

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
			style={{ height: "94vh" }}
		>
			<ResizablePanel
				defaultSize={30}
				className="border-r-2"
			>
				<FavoritePackagesContainer />
				<OutlineObjectContainer />
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel>
				<EditorAreaContainer />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
