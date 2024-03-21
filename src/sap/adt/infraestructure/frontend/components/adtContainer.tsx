import { useEffect } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import PanelLeft from "./panelLeft";
import { useAppSelector } from "shared/storage/useStore";
import useAdt from "sap/adt/infraestructure/frontend/hooks/useAdt";
import EditorAreaContainer from "sap/adt/infraestructure/frontend/components/editorArea/editorAreaContainer";

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
	/* Nota Iván: El ResizablePanel pone por defecto el overflow-hidden y los componentes inferiores nunca sacan el scroll. La solución que he encontrado
 es forzar que tenga overflow.
*/

	/*

	<ResizablePanelGroup direction="vertical">
					<ResizablePanel
						className="scrollbar-thin scroll-smooth hover:!overflow-y-auto"
						collapsible={true}
					>
						<FavoritePackagesContainer />
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel
						className="scrollbar-thin scroll-smooth hover:!overflow-y-auto"
						collapsible={true}
					>
						<OutlineObjectMain />
					</ResizablePanel>
				</ResizablePanelGroup>

	*/
	return (
		<ResizablePanelGroup
			direction="horizontal"
			style={{ height: "94vh" }}
		>
			<ResizablePanel
				defaultSize={30}
				className="border-r-2"
			>
				<PanelLeft />
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel>
				<EditorAreaContainer />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
