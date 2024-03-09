import { FC } from "react";
import { ADT_OBJECT_TYPES } from "sap/adt/infraestructure/constants/adtConstants";
import ClassToolbar from "./class/classToolbar";

import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";

interface Props {
	objectEditor: ADTObjectEditor;
}
const EditorToolbarOjectContainer: FC<Props> = ({ objectEditor }) => {
	return (
		<>
			{objectEditor &&
				objectEditor.objectInfo.objectType.includes(
					ADT_OBJECT_TYPES.CLASSES.OBJECT_TYPE
				) && <ClassToolbar objectEditor={objectEditor} />}
		</>
	);
};
export default EditorToolbarOjectContainer;
