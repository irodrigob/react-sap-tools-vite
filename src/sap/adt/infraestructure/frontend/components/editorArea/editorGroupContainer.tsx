import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { useAppSelector } from "shared/storage/useStore";
import useAdtStore from "sap/adt/infraestructure/frontend/hooks/useAdtStore";
import TabLabel from "./tabLabel";
import EditorMain from "./editor/editorMain";

export default function EditorGroupContainer() {
	const { objectsEditor, objectKeyActive } = useAppSelector(
		(state) => state.ADT
	);

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
								<TabLabel
									objectInfo={row.objectInfo}
									objectKey={row.objectKey}
									key={row.objectKey}
								/>
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
