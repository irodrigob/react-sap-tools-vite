import { useRef } from "react";
import { FC } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import EditorGroupContainer from "./editorGroupContainer";
import StatusGroupContainer from "./statusGroupContainer";
import EditorToolbarContainer from "./editor/toolbar/editorToolbarContainer";

const EditorAreaContainer: FC = () => {
	return (
		<ResizablePanelGroup
			direction="vertical"
			onLayout={(sizes: number[]) => {
				console.log(sizes);
			}}
		>
			<ResizablePanel defaultSize={90}>
				<div className="flex flex-col">
					<EditorToolbarContainer />
					<EditorGroupContainer />
				</div>
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel
				defaultSize={10}
				className="border-t-0"
			>
				<StatusGroupContainer />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
};

export default EditorAreaContainer;
