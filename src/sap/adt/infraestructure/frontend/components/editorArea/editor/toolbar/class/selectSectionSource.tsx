import { FC, useCallback, useState } from "react";
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
import useEditor from "sap/adt/infraestructure/frontend/hooks/useEditor";

interface Props {
	onChangeSection: (section: string) => void;
	sectionSource: string;
}
const SelectSectionSource: FC<Props> = ({ sectionSource, onChangeSection }) => {
	const { getI18nText } = useTranslations();
	const [sectionSelected, setSectionSelected] = useState(CLASS_DEFAULT_SECTION);

	const handleChangeValue = useCallback((value: string) => {}, []);

	return (
		<>
			<Label
				htmlFor="selectClassSource"
				className="pr-2"
			>
				{getI18nText("adtIde.editor.classes.labelSectionSource")}
			</Label>
			<Select
				value={sectionSource}
				key="selectClassSource"
				onValueChange={onChangeSection}
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
};

export default SelectSectionSource;
