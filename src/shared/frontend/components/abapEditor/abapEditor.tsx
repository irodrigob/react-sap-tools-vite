import { FC } from "react";
import Editor from "@monaco-editor/react";
import { useTranslations } from "translations/i18nContext";

interface Props {
	readonly?: boolean;
	content: string;
	height?: string;
}

/*

<Editor
				defaultLanguage="abap"
				value={content}
				theme="vs-dark"
				options={{
					readOnly: readonly ?? true,
					readOnlyMessage: {
						value: getI18nText("adtIde.editor.readOnlyMessage"),
						supportHtml: true,
					},
				}}
			/>

*/

const ABAPEditor: FC<Props> = ({ content, readonly, height }) => {
	const { getI18nText } = useTranslations();
	return (
		<Editor
			defaultLanguage="abap"
			value={content}
			height="50vh"
			theme="vs-dark"
			options={{
				readOnly: readonly ?? true,
				readOnlyMessage: {
					value: getI18nText("adtIde.editor.readOnlyMessage"),
					supportHtml: true,
				},
			}}
		/>
	);
};

export default ABAPEditor;
