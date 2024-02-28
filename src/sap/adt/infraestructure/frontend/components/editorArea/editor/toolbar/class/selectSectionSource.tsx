import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
	CLASS_SECTION_SOURCE,
	CLASS_DEFAULT_SECTION,
} from "sap/adt/infraestructure/constants/editorConstants";
import { useTranslations } from "translations/i18nContext";

export default function SelectSectionSource() {
	const { getI18nText } = useTranslations();
	const [sectionSelected, setSectionSelected] = useState(CLASS_DEFAULT_SECTION);

	return (
		<>
			<Label
				htmlFor="selectClassSource"
				className="pr-2"
			>
				{getI18nText("adtIde.editor.classes.labelSectionSource")}
			</Label>
			<Select
				value={sectionSelected}
				key="selectClassSource"
				onValueChange={(value: any) => {
					setSectionSelected(value);
				}}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue
						placeholder={getI18nText(
							"adtIde.editor.classes.placeHolderSectionSource"
						)}
					/>
				</SelectTrigger>
				<SelectContent>
					{Object.keys(CLASS_SECTION_SOURCE).map((k: any) => {
						return (
							<SelectItem
								value={k}
								key={k}
							>
								{getI18nText(CLASS_SECTION_SOURCE[k])}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</>
	);
}
