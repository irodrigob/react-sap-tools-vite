import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "shared/storage/useStore";
import useAdtStore from "sap/adt/infraestructure/frontend/hooks/useAdtStore";
import TabLabel from "./tabLabel";

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
				>
					<TabsList>
						{objectsEditor.map((row) => {
							return (
								<TabsTrigger
									value={row.objectKey}
									key={row.objectKey}
									className="hover:bg-gray-700 mr-2"
								>
									<TabLabel title={row.objectInfo.object.objectName} />
								</TabsTrigger>
							);
						})}
					</TabsList>
					{objectsEditor.map((row) => {
						return (
							<TabsContent
								value={row.objectKey}
								key={row.objectKey}
							>
								Make changes to your account here.
							</TabsContent>
						);
					})}
				</Tabs>
			)}
		</>
	);
}
