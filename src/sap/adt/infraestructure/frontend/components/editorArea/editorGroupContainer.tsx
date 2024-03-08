import { useCallback, useMemo } from "react";
//import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabList, {
	TabDefinition,
	TabDefinitionArray,
} from "shared/frontend/components/tabs";
import { useAppSelector } from "shared/storage/useStore";
import useEditorGroup from "sap/adt/infraestructure/frontend/hooks/useEditorGroup";
import EditorMain from "./editor/editorMain";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";

export default function EditorGroupContainer() {
	const { objectsEditor, objectKeyActive } = useAppSelector(
		(state) => state.ADT
	);
	const { closeTab, selectTab } = useEditorGroup();

	const objectEditorActive = useMemo(() => {
		return objectsEditor.find(
			(row) => row.objectKey == objectKeyActive
		) as ADTObjectEditor;
	}, [objectKeyActive, objectsEditor]);

	const handlerTabChange = useCallback(
		(tabSelected: TabDefinition) => {
			selectTab(tabSelected.key);
		},
		[objectsEditor, objectKeyActive]
	);
	const handlerTabClose = useCallback(
		(tabSelected: TabDefinition) => {
			closeTab(tabSelected.key);
		},
		[objectsEditor, objectKeyActive]
	);
	const tabList = useMemo(() => {
		let newTabList: TabDefinitionArray = [];

		newTabList = objectsEditor.map((row) => {
			return {
				key: row.objectKey,
				description: row.objectInfo.object.objectName,
			};
		});

		return newTabList;
	}, [objectsEditor]);

	/*

			{objectsEditor.length > 0 && (
				<Tabs
					defaultValue={objectKeyActive}
					onValueChange={(value: string) => {
						selectTab(value);
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
										closeTab(row.objectKey);
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
								data-state={
									objectKeyActive == row.objectKey ? "active" : "inactive"
								}
							>
								<EditorMain objectEditor={row} />
							</TabsContent>
						);
					})}
				</Tabs>
			)}
	*/
	return (
		<>
			{objectsEditor.length > 0 && (
				<TabList
					tabs={tabList}
					defaultValue={objectKeyActive}
					onTabChange={(tabSelected: TabDefinition) => {
						selectTab(tabSelected.key);
					}}
					onCloseTab={(tabSelected: TabDefinition) => {
						closeTab(tabSelected.key);
					}}
				/>
			)}
			<p>{objectKeyActive}</p>
		</>
	);
}
