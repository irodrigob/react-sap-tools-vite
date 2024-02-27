import { FC } from "react";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";
import { ADT_OBJECT_TYPES } from "sap/adt/infraestructure/constants/adtConstants";
import EditorClassContainer from "./class/editorClassContainer";

interface Props {
	objectEditor: ADTObjectEditor;
}

const EditorMain: FC<Props> = ({ objectEditor }) => {
	return (
		<>
			{objectEditor.objectInfo.objectType.includes(
				ADT_OBJECT_TYPES.CLASSES.OBJECT_TYPE
			) && <EditorClassContainer objectEditor={objectEditor} />}
		</>
	);
};

export default EditorMain;
