import { FC } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import EditorGroupContainer from "./editorGroupContainer";
import StatusGroupContainer from "./statusGroupContainer";
import EditorToolbar from "./editor/editorToolbar";

const EditorAreaContainer: FC = () => {
	return (
		<ResizablePanelGroup direction="vertical">
			<ResizablePanel defaultSize={90}>
				<div className="flex flex-col">
					<EditorToolbar />
					<EditorGroupContainer />
				</div>
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel
				defaultSize={10}
				className="border-t-2"
			>
				<StatusGroupContainer />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
};

export default EditorAreaContainer;
