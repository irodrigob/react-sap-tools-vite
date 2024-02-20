import { FC } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import EditorGroupContainer from "./editorGroupContainer";
import StatusGroupContainer from "./statusGroupContainer";

const EditorAreaContainer: FC = () => {
	return (
		<ResizablePanelGroup direction="vertical">
			<ResizablePanel defaultSize={90}>
				<EditorGroupContainer />
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel defaultSize={10}>
				<StatusGroupContainer />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
};

export default EditorAreaContainer;
