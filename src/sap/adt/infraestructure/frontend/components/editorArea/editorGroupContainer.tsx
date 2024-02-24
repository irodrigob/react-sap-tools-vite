import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "shared/storage/useStore";
import useAdtStore from "sap/adt/infraestructure/frontend/hooks/useAdtStore";
import useEditorGroup from "sap/adt/infraestructure/frontend/hooks/useEditorGroup";
import EditorMain from "./editor/editorMain";

export default function EditorGroupContainer() {
	const { objectsEditor, objectKeyActive } = useAppSelector(
		(state) => state.ADT
	);
	const { closeTab } = useEditorGroup();
	const { setObjectKeyActiveAction } = useAdtStore();

	return (
		<>
			{objectsEditor.length > 0 && (
				<Tabs
					defaultValue={objectKeyActive}
					onValueChange={(value: string) => {
						setObjectKeyActiveAction(value);
					}}
					orientation="horizontal"
				>
					<TabsList className="ml-1">
						{objectsEditor.map((row) => {
							return (
								<TabsTrigger
									value={row.objectKey}
									key={row.objectKey}
									data-state={
										objectKeyActive == row.objectKey ? "active" : "inactive"
									}
									onCloseTab={() => {
										closeTab(row.objectInfo);
									}}
								>
									{row.objectInfo.object.objectName}
								</TabsTrigger>
							);
						})}
					</TabsList>
					{objectsEditor.map((row) => {
						// El forceAmount lo hago para la pestaña activa porque cuando se cierra pestaña no se refresca intermamente,
						// por ello hay que forzarlo
						return (
							<TabsContent
								value={row.objectKey}
								key={row.objectKey}
								forceMount={objectKeyActive == row.objectKey ? true : undefined}
							>
								<EditorMain objectEditor={row} />
							</TabsContent>
						);
					})}
				</Tabs>
			)}
		</>
	);
}
