import { useAppSelector } from "shared/storage/useStore";
import EditorToolbar from "./editorToolbar";
import EditorToolbarOjectContainer from "./editorToolbarOjectContainer";

export default function EditorToolbarContainer() {
	const { objectsEditor } = useAppSelector((state) => state.ADT);

	return (
		<>
			{objectsEditor.length > 0 && (
				<div className="grid grid-cols-2">
					<EditorToolbar />
					<EditorToolbarOjectContainer />
				</div>
			)}
		</>
	);
}
