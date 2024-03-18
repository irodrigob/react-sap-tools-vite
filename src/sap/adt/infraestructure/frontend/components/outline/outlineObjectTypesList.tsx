import { FC } from "react";
import {
	ADTStructureElement,
	ADTStructureElements,
} from "sap/adt/domain/entities/objectStructure";
import { PREFIX_TREENODE } from "sap/adt/infraestructure/constants/outlineConstants";
import { OBJECT_STRUCTURE } from "sap/adt/infraestructure/constants/adtConstants";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";
import useOutline from "sap/adt/infraestructure/frontend/hooks/useOutline";
import IconObjectType from "./iconObjectType";
import useAbapEditor from "shared/frontend/components/abapEditor/useAbapEditor";

interface Props {
	elements: ADTStructureElements;
	objectEditor: ADTObjectEditor;
}

const OutlineObjectTypesList: FC<Props> = ({ elements, objectEditor }) => {
	const {} = useOutline();
	const { navigateToPosition } = useAbapEditor();

	const handlerObjectClick = (objectInfo: ADTStructureElement) => {
		// Busco primero la posicion donde empieza la deficion del objeto.
		let blockPos = objectInfo.blockInfo.find(
			(row) => row.block == OBJECT_STRUCTURE.BLOCK_INFO.IDENTIFIER.DEFINITION
		);
		// Si no existe busco por la definición
		if (blockPos)
			blockPos = objectInfo.blockInfo.find(
				(row) => row.block == OBJECT_STRUCTURE.BLOCK_INFO.BLOCK.DEFINITION
			);

		if (blockPos) {
			let positions = blockPos.startPos.split(",");
			if (positions.length > 1) {
				navigateToPosition(+positions[0], +positions[1]);
			}
		}
	};
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
											<IconObjectType
												type={row.type}
												visibility={row.visibility}
												isEventHandlerMethod={row.isEventHandlerMethod}
												isConstant={row.isConstant}
												isConstructor={row.isConstructor}
												isReadOnly={row.isReadOnly}
												isRedefinition={row.isRedefinition}
											/>
											<span
												className={`cursor-pointer`}
												onClick={() => {
													handlerObjectClick(row);
												}}
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
