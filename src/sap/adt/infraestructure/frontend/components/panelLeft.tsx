import { useEffect, useRef, useState } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ImperativePanelHandle } from "react-resizable-panels";
import FavoritePackagesContainer from "sap/adt/infraestructure/frontend/components/favoritePackages/favoritePackagesContainer";
import OutlineObjectMain from "./outline/outlineObjectMain";

export default function PanelLeft() {
	const [openOutline, setOpenOutline] = useState(false);
	const panelFavoritePackagesRef = useRef<ImperativePanelHandle>(null);
	const panelOutlinesRef = useRef<ImperativePanelHandle>(null);
	const collapseFavorite = (open: boolean) => {
		if (open) {
			panelFavoritePackagesRef.current?.expand();
			if (openOutline) {
				panelFavoritePackagesRef.current?.resize(75);
				panelOutlinesRef.current?.resize(25);
			}
		} else {
			panelFavoritePackagesRef.current?.collapse();
		}
	};
	const collapseOutline = (open: boolean) => {
		setOpenOutline(open);
		if (open) {
			panelOutlinesRef.current?.expand();
		} else {
			panelOutlinesRef.current?.collapse();
		}
	};

	useEffect(() => {
		panelOutlinesRef.current?.collapse();
	}, []);

	/* Nota Iván: El ResizablePanel pone por defecto el overflow-hidden y los componentes inferiores nunca sacan el scroll. La solución que he encontrado
 es forzar que tenga overflow.
*/

	return (
		<ResizablePanelGroup direction="vertical">
			<ResizablePanel
				ref={panelFavoritePackagesRef}
				className="scrollbar-thin scroll-smooth hover:!overflow-y-auto"
				collapsible
				collapsedSize={3}
				defaultSize={75}
			>
				<FavoritePackagesContainer onOpenChange={collapseFavorite} />
			</ResizablePanel>
			{openOutline && <ResizableHandle />}
			<ResizablePanel
				collapsible
				className="scrollbar-thin scroll-smooth hover:!overflow-y-auto"
				collapsedSize={2}
				ref={panelOutlinesRef}
				defaultSize={25}
			>
				<OutlineObjectMain
					onOpenChange={collapseOutline}
					defaultOpen={false}
				/>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
