import { FC } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTranslations } from "translations/i18nContext";
import { ADT_OBJECT_TYPES } from "sap/adt/infraestructure/constants/adtConstants";
interface Props {
	onChangeSection: (section: string) => void;
	sectionSource: string;
}
const SelectSectionSource: FC<Props> = ({ sectionSource, onChangeSection }) => {
	const { getI18nText } = useTranslations();

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
					{ADT_OBJECT_TYPES.CLASSES.EDITOR.SECTION_SOURCES.map((row: any) => {
						return (
							<SelectItem
								value={row.SECTION}
								key={row.SECTION}
							>
								{getI18nText(row.LABEL)}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</>
	);
};

export default SelectSectionSource;
