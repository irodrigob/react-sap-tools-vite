import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";
import ArrayUtils from "shared/utils/array/arrayUtils";
import {
	ADTStructureElements,
	ADTStructureElement,
} from "sap/adt/domain/entities/objectStructure";
import { PREFIX_TREENODE } from "sap/adt/infraestructure/constants/outlineConstants";
import useTree from "sap/adt/infraestructure/frontend/hooks/useTree";
import { useAppSelector } from "shared/storage/useStore";
import OutlineObjectTypesList from "./outlineObjectTypesList";

type GroupedTypeList = Record<string, ADTStructureElements>;

interface Props {
	objectEditor: ADTObjectEditor;
}

const OutlineObjectTypes: FC<Props> = ({ objectEditor }) => {
	const [typesList, setTypesList] = useState<string[]>([]);
	const { treeAttributesMap } = useAppSelector((state) => state.ADT);
	const [groupedTypeList, setGroupedTypeList] = useState<GroupedTypeList>({});
	const { expandCollapseNode } = useTree();

	useEffect(() => {
		if (objectEditor.objectStructure) {
			let newGroupedTypeList = ArrayUtils.groupBy<ADTStructureElement>(
				objectEditor!.objectStructure!.structureElements,
				(e) => e.typeDesc
			);
			setGroupedTypeList(newGroupedTypeList);
			let newTypesList = [];
			for (const typeList in newGroupedTypeList) {
				newTypesList.push(typeList);
			}
			setTypesList(newTypesList);
		}
	}, [objectEditor.objectStructure]);

	return (
		<ul className="list-none ml-2">
			{typesList.map((row) => {
				let nodeKey = `${PREFIX_TREENODE}_${objectEditor.objectInfo.object.objectName}_${row}`;

				return (
					<div key={`${nodeKey}`}>
						<li
							className="hover:bg-slate-800"
							key={nodeKey}
						>
							<div className="flex items-center flex-row">
								<div className="flex-none">
									<Button
										variant="ghost"
										onClick={() => {
											expandCollapseNode(nodeKey);
										}}
										size="icon"
										className="h-2"
									>
										{treeAttributesMap[nodeKey] &&
										treeAttributesMap[nodeKey].expanded ? (
											<ChevronDownIcon className="h-4 w-4" />
										) : (
											<ChevronRightIcon className="h-4 w-4" />
										)}
									</Button>
								</div>
								<div className="shrink text-sm w-52">{row}</div>
							</div>
						</li>
						<div key={`${nodeKey}_content`}>
							{treeAttributesMap[nodeKey] &&
								treeAttributesMap[nodeKey].expanded && (
									<OutlineObjectTypesList
										objectEditor={objectEditor}
										elements={groupedTypeList[row]}
									/>
								)}
						</div>
					</div>
				);
			})}
		</ul>
	);
};

export default OutlineObjectTypes;
