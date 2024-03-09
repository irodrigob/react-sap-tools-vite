import { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ADTStructureElements } from "sap/adt/domain/entities/objectStructure";
import { PREFIX_TREENODE } from "sap/adt/infraestructure/constants/outlineConstants";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";

interface Props {
	elements: ADTStructureElements;
	objectEditor: ADTObjectEditor;
}

const OutlineObjectTypesList: FC<Props> = ({ elements, objectEditor }) => {
	return (
		<ul className="list-none ml-9">
			{Array.isArray(elements) &&
				elements.map((row) => {
					let nodeKey = `${PREFIX_TREENODE}_${objectEditor.objectInfo.object.objectName}_${row.type}_${row.name}`;
					return (
						<div key={`${nodeKey}`}>
							<li
								className="hover:bg-slate-800 py-1"
								key={nodeKey}
							>
								<div className="flex items-center flex-row">
									<div className="shrink text-sm">
										<div className="flex items-center flex-row space-x-2">
											<span
												className={`cursor-pointer`}
												onClick={() => {}}
											>
												{row.name}
											</span>
										</div>
									</div>
								</div>
							</li>
						</div>
					);
				})}
		</ul>
	);
};

export default OutlineObjectTypesList;
