import { FC } from "react";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";
import { ADT_OBJECT_TYPES } from "sap/adt/infraestructure/constants/adtConstants";
import EditorClassContainer from "./class/editorClassContainer";
import LoadingEditorContentSpinner from "./loadingEditorContentSpinner";

interface Props {
	objectEditor: ADTObjectEditor;
}

const EditorMain: FC<Props> = ({ objectEditor }) => {
	return (
		<>
			{objectEditor.loadingContent && (
				<LoadingEditorContentSpinner
					objectName={objectEditor.objectInfo.object.objectName}
				/>
			)}
			{objectEditor.objectInfo.objectType.includes(
				ADT_OBJECT_TYPES.CLASSES.OBJECT_TYPE
			) &&
				!objectEditor.loadingContent && (
					<EditorClassContainer objectEditor={objectEditor} />
				)}
		</>
	);
};

export default EditorMain;
