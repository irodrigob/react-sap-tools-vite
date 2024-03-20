import { FC } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import EditorGroupContainer from "./editorGroupContainer";
import StatusGroupContainer from "../statusGroup/statusGroupContainer";
import EditorToolbarContainer from "./editor/toolbar/editorToolbarContainer";
import { DEFAULT_SIZE_EDITOR_AREA } from "sap/adt/infraestructure/constants/editorConstants";
import useAdtStore from "sap/adt/infraestructure/frontend/hooks/useAdtStore";
const EditorAreaContainer: FC = () => {
	const { setHeightEditorAction } = useAdtStore();
	return (
		<ResizablePanelGroup
			direction="vertical"
			onLayout={(sizes: number[]) => {
				let newEditorHeight = Math.round(
					(DEFAULT_SIZE_EDITOR_AREA.HEIGHT_EDITOR * sizes[0]) /
						DEFAULT_SIZE_EDITOR_AREA.PANEL_EDITOR
				);
				/*console.log(
					`Editor area: ${sizes[0]} - Panel area: ${sizes[1]} - New Height: ${newEditorHeight}`
				);*/
				setHeightEditorAction(newEditorHeight);
			}}
		>
			<ResizablePanel defaultSize={DEFAULT_SIZE_EDITOR_AREA.PANEL_EDITOR}>
				<div className="flex flex-col">
					<EditorToolbarContainer />
					<EditorGroupContainer />
				</div>
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel defaultSize={DEFAULT_SIZE_EDITOR_AREA.PANEL_STATUS}>
				<StatusGroupContainer />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
};

export default EditorAreaContainer;
