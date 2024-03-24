import { useMemo } from "react";
import { firstBy } from "thenby";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "shared/storage/useStore";
import useEditor from "sap/adt/infraestructure/frontend/hooks/useEditor";
import { PROBLEMS_TAB } from "sap/adt/infraestructure/constants/statusGroupContants";
import { useTranslations } from "translations/i18nContext";

export default function ProblemsContainer() {
	const { getObjectEditorActive } = useEditor();
	const { getI18nText } = useTranslations();
	const { objectsEditor, objectKeyActive } = useAppSelector(
		(state) => state.ADT
	);

	const objectMessages = useMemo(() => {
		let objectActive = getObjectEditorActive();
		if (objectActive)
			return objectActive.objectCheckRun?.messagesList.sort(firstBy("type"));
		else return [];
	}, [objectKeyActive, objectsEditor]);

	return (
		<>
			{objectMessages && objectMessages.length > 0 && (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>
								{getI18nText(
									"adtIde.statusGroup.problemsSection.messagesTable.colType"
								)}
							</TableHead>
							<TableHead>
								{getI18nText(
									"adtIde.statusGroup.problemsSection.messagesTable.colMessage"
								)}
							</TableHead>
							<TableHead>
								{getI18nText(
									"adtIde.statusGroup.problemsSection.messagesTable.colPosition"
								)}
							</TableHead>
							<TableHead>
								{getI18nText(
									"adtIde.statusGroup.problemsSection.messagesTable.colSection"
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
		</>
	);
}
