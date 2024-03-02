import { FC } from "react";
import Editor from "@monaco-editor/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";

interface Props {
	objectEditor: ADTObjectEditor;
}
const EditorClassContainer: FC<Props> = ({ objectEditor }) => {
	const { getI18nText } = useTranslations();
	const { objectEditorActive } = useAppSelector((state) => state.ADT);
	return (
		<Tabs defaultValue="globalClass">
			<div className="">
				<TabsContent value="globalClass">codigo principal</TabsContent>
				<TabsContent value="localClass">Clases locales</TabsContent>
				<TabsContent value="testClass">Clases de test</TabsContent>
				<TabsContent value="macros">Macros</TabsContent>
			</div>
			<TabsList className="">
				<TabsTrigger value="globalClass">
					{getI18nText("adtIde.editor.classes.tabGlobalClass")}
				</TabsTrigger>
				<TabsTrigger value="localClass">
					{getI18nText("adtIde.editor.classes.tabClassLocal")}
				</TabsTrigger>
				<TabsTrigger value="testClass">
					{getI18nText("adtIde.editor.classes.tabTestClasses")}
				</TabsTrigger>
				<TabsTrigger value="macros">
					{getI18nText("adtIde.editor.classes.tabMacros")}
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
};

export default EditorClassContainer;
