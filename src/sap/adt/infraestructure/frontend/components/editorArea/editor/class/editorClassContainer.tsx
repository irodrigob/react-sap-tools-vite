import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";

interface Props {
	objectEditor: ADTObjectEditor;
}
const EditorClassContainer: FC<Props> = ({ objectEditor }) => {
	return (
		<Tabs defaultValue="account">
			<TabsList>
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="password">Password</TabsTrigger>
			</TabsList>
			<TabsContent value="account">
				Make changes to your account here.
			</TabsContent>
			<TabsContent value="password">Change your password here.</TabsContent>
		</Tabs>
	);
};

export default EditorClassContainer;
