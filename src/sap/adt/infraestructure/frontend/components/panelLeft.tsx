import { useRef } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ImperativePanelHandle } from "react-resizable-panels";
import FavoritePackagesContainer from "sap/adt/infraestructure/frontend/components/favoritePackages/favoritePackagesContainer";
import OutlineObjectMain from "./outline/outlineObjectMain";
import { useState } from "react";

export default function PanelLeft() {
	const [favoriteCollapsed, setFavoriteCollapsed] = useState(true);
	const [outlineCollapsed, setOutlineCollapsed] = useState(false);
	const ref = useRef<ImperativePanelHandle>(null);
	const collapseFavorite = () => {
		const panel = ref.current;
		if (panel) {
			panel.collapse();
		}
	};

	return (
		<ResizablePanelGroup direction="vertical">
			<ResizablePanel
				ref={ref}
				collapsible
				collapsedSize={3}
			>
				<FavoritePackagesContainer
					onCollapsed={(collapsed) => {
						setFavoriteCollapsed(collapsed);
						if (!collapsed) collapseFavorite();
					}}
				/>
			</ResizablePanel>
			{(favoriteCollapsed || outlineCollapsed) && <ResizableHandle />}
			<ResizablePanel
				collapsible
				collapsedSize={2}
			>
				<OutlineObjectMain onCollapsed={setOutlineCollapsed} />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
