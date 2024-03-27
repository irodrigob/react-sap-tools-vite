import { useMemo } from "react";
import { firstBy } from "thenby";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ChevronRightIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "shared/storage/useStore";
import useEditor from "sap/adt/infraestructure/frontend/hooks/useEditor";
import {
	PROBLEMS_TAB,
	PREFIX_TREENODE,
} from "sap/adt/infraestructure/constants/statusGroupContants";
import { useTranslations } from "translations/i18nContext";
import useTree from "sap/adt/infraestructure/frontend/hooks/useTree";

export default function ProblemsContainer() {
	const { getI18nText } = useTranslations();
	const { expandCollapseNode } = useTree();
	const { treeAttributesMap, objectsEditor } = useAppSelector(
		(state) => state.ADT
	);

	/*
{objectMessages && objectMessages.length > 0 && (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[10%]">
								{getI18nText(
									"adtIde.statusGroup.problemsSection.messagesTable.colSection"
								)}
							</TableHead>
							<TableHead className="w-[7%]">
								{getI18nText(
									"adtIde.statusGroup.problemsSection.messagesTable.colType"
								)}
							</TableHead>
							<TableHead className="w-[60%]">
								{getI18nText(
									"adtIde.statusGroup.problemsSection.messagesTable.colMessage"
								)}
							</TableHead>
							<TableHead>
								{getI18nText(
									"adtIde.statusGroup.problemsSection.messagesTable.colPosition"
								)}
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{objectMessages.map((rowMessage, index) => {
							let msgType = "";
							if (rowMessage.type == PROBLEMS_TAB.MESSAGE_TYPE.ERROR)
								msgType = getI18nText(
									"adtIde.statusGroup.problemsSection.messageType.lblError"
								);
							else if (rowMessage.type == PROBLEMS_TAB.MESSAGE_TYPE.WARNING)
								msgType = getI18nText(
									"adtIde.statusGroup.problemsSection.messageType.lblWarning"
								);

							return (
								<TableRow key={`PROBLEM_ROW_${index}`}>
									<TableCell>{msgType}</TableCell>
									<TableCell>{rowMessage.shortText}</TableCell>
									<TableCell>{rowMessage.pos}</TableCell>
									<TableCell>{rowMessage.sourceUri}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			)}

	*/
	return (
		<>
			<ul className="list-none ml-2">
				{objectsEditor &&
					objectsEditor.map((rowObjectEditor) => {
						let nodeKey = `${PREFIX_TREENODE}_${rowObjectEditor.objectInfo.category}_${rowObjectEditor.objectInfo.objectType}_${rowObjectEditor.objectInfo.object.objectName}`;
						return (
							<li
								className="hover:bg-slate-800"
								key={nodeKey}
							>
								<div className="flex items-center flex-row align-middle content-center">
									<div className="flex-none">
										<Button
											variant="ghost"
											onClick={() => {
												expandCollapseNode(nodeKey);
											}}
											size="icon"
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
										{rowObjectEditor.objectInfo.objectTypeDesc}{" "}
										{rowObjectEditor.objectInfo.object.objectName}
									</div>
								</div>
							</li>
						);
					})}
			</ul>
		</>
	);
}
