import { FC } from "react";
import Editor from "@monaco-editor/react";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";

interface Props {
	readonly?: boolean;
	content: string;
}

const ABAPEditor: FC<Props> = ({ content, readonly }) => {
	const { heightEditor } = useAppSelector((state) => state.ADT);
	const { getI18nText } = useTranslations();
	return (
		<Editor
			defaultLanguage="abap"
			value={content}
			height={`${heightEditor}vh`}
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
