import { FC, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";
import { useTranslations } from "translations/i18nContext";
import { ADT_OBJECT_TYPES } from "sap/adt/infraestructure/constants/adtConstants";
import { ADTClassSourceInclude } from "sap/adt/domain/entities/classContent";

interface Props {
	objectEditor: ADTObjectEditor;
}
const EditorClassContainer: FC<Props> = ({ objectEditor }) => {
	const { getI18nText } = useTranslations();
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
			<Editor
				height="80vh"
				defaultLanguage="abap"
				defaultValue={sourceInclude?.contentSource}
				theme="vs-dark"
			/>
		</>
	);
};

export default EditorClassContainer;
