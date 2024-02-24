import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";
import { useTranslations } from "translations/i18nContext";

interface Props {
	objectEditor: ADTObjectEditor;
}
const EditorClassContainer: FC<Props> = ({ objectEditor }) => {
	const { getI18nText } = useTranslations();
	return (
		<Tabs defaultValue="globalClass">
			<div className="2xl:h-[79vh] xl:h-[77vh] md:h-[70vh] ">
				<TabsContent value="globalClass">codigo principal</TabsContent>
				<TabsContent value="localClass">Clases locales</TabsContent>
				<TabsContent value="testClass">Clases de test</TabsContent>
				<TabsContent value="macros">Macros</TabsContent>
			</div>
			<TabsList>
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
