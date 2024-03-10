import { FC, useEffect } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";
import { useAppSelector } from "shared/storage/useStore";
import { PREFIX_TREENODE } from "sap/adt/infraestructure/constants/outlineConstants";
import useTree from "sap/adt/infraestructure/frontend/hooks/useTree";
import OutlineObjectTypes from "./outlineObjectTypes";

interface Props {
	objectEditor: ADTObjectEditor;
}

const OutlineObject: FC<Props> = ({ objectEditor }) => {
	const { treeAttributesMap } = useAppSelector((state) => state.ADT);
	const { expandCollapseNode } = useTree();
	const nodeKey = `${PREFIX_TREENODE}${objectEditor.objectStructure?.name}`;

	useEffect(() => {
		if (objectEditor.objectStructure?.name != "" && !treeAttributesMap[nodeKey])
			expandCollapseNode(nodeKey);
	}, [treeAttributesMap[nodeKey]]);

	return (
		<>
			<ul className="list-none ml-2">
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
						<div className="shrink text-sm w-52">
							{objectEditor.objectStructure?.name}
						</div>
					</div>
				</li>
				<div key={`${nodeKey}_content`}>
					{treeAttributesMap[nodeKey] &&
						treeAttributesMap[nodeKey].expanded && (
							<OutlineObjectTypes objectEditor={objectEditor} />
						)}
				</div>
			</ul>
		</>
	);
};

export default OutlineObject;
