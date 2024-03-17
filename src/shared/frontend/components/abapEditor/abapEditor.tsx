import { FC, useEffect, useRef } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";

interface Props {
	readonly?: boolean;
	content: string;
}

const ABAPEditor: FC<Props> = ({ content, readonly }) => {
	const { heightEditor } = useAppSelector((state) => state.ADT);
	const { getI18nText } = useTranslations();
	const monaco = useMonaco();

	useEffect(() => {
		if (monaco) {
			console.log("here is the monaco instance:", monaco);
		}
	}, [monaco]);

	//height={`${heightEditor}vh`}
	return (
		<>
			<button
				onClick={() => {
					let editor = monaco?.editor;
					let models = editor?.getModels();
					console.log(models?.length);

					/*monaco?.Selection.fromPositions(
						{ lineNumber: 17, column: 1 },
						{ lineNumber: 17, column: 20 }
					);*/
				}}
			>
				Navegar
			</button>
			<Editor
				defaultLanguage="abap"
				value={content}
				height={`80vh`}
				theme="vs-dark"
				options={{
					readOnly: readonly ?? true,
					readOnlyMessage: {
						value: getI18nText("adtIde.editor.readOnlyMessage"),
						supportHtml: true,
					},
				}}
			/>
		</>
	);
};

export default ABAPEditor;
