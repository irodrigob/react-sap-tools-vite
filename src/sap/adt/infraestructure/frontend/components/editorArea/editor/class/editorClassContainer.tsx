import { FC, useEffect, useState } from "react";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";
import { ADT_OBJECT_TYPES } from "sap/adt/infraestructure/constants/adtConstants";
import { ADTClassSourceInclude } from "sap/adt/domain/entities/classContent";
import ABAPEditor from "shared/frontend/components/abapEditor/abapEditor";

interface Props {
	objectEditor: ADTObjectEditor;
}
const EditorClassContainer: FC<Props> = ({ objectEditor }) => {
	const [sourceInclude, setSourceInclude] = useState<ADTClassSourceInclude>();

	useEffect(() => {
		if (objectEditor.sectionSource == "") {
		} else {
			let sourceUri = ADT_OBJECT_TYPES.CLASSES.EDITOR.SECTION_SOURCES.find(
				(row) => row.SECTION == objectEditor.sectionSource
			)?.SOURCE_URI;
			// Puedee ser que el registro no exista porque he visto que hay clases que la seccion de Test no viene el codigo.
			if (sourceUri) {
				let sourceInclude = objectEditor.objectContent?.sourceIncludes.find(
					(row) => row.sourceUri == sourceUri
				);
				if (sourceInclude) setSourceInclude(sourceInclude);
			} else {
			}
		}
	}, [objectEditor]);

	return (
		<>
			<ABAPEditor content={sourceInclude?.contentSource as string} />
		</>
	);
};

export default EditorClassContainer;
