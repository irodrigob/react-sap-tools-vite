import { useCallback, useMemo } from "react";
import {
	TabItem,
	TabsList,
	TabContent,
	Tabs,
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

	return (
		<>
			{objectsEditor.length > 0 && (
				<Tabs>
					<TabsList>
						{objectsEditor.map((row) => {
							return (
								<TabItem
									key={row.objectKey}
									value={row.objectKey}
									active={row.objectKey == objectKeyActive}
									onSelectedTab={(tab: string) => {
										selectTab(tab);
									}}
									onCloseTab={(tab: string) => {
										closeTab(tab);
									}}
								>
									{row.objectInfo.object.objectName}
								</TabItem>
							);
						})}
					</TabsList>
					<TabContent>
						<EditorMain objectEditor={objectEditorActive} />
					</TabContent>
				</Tabs>
			)}
		</>
	);
}
