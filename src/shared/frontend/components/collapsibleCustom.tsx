import { FC, ReactNode, useState } from "react";
import {
	CaretSortIcon,
	CaretDownIcon,
	CaretUpIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useTranslations } from "@/translations/i18nContext";
interface Props {
	titleCollapsed: string;
	headerToolbar?: ReactNode;
}
const CollapsibleCustom: FC<Props> = (props: Props) => {
	const { titleCollapsed, headerToolbar } = props;
	const [isOpen, setIsOpen] = useState(false);
	const { getI18nText } = useTranslations();

	/*

	
	*/
	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="space-y-2"
		>
			<div className="flex items-center space-x-1 px-2">
				<CollapsibleTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
					>
						{isOpen && <CaretUpIcon className="h-4 w-4" />}
						{!isOpen && <CaretDownIcon className="h-4 w-4" />}
						<span className="sr-only">
							{getI18nText("collapsibleCustom.toggle")}
						</span>
					</Button>
				</CollapsibleTrigger>
				<h4 className="text-lg font-semibold">{titleCollapsed}</h4>
				<div style={{ marginLeft: "auto" }}>{headerToolbar}</div>
			</div>
			<div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
				@radix-ui/primitives
			</div>
			<CollapsibleContent className="space-y-2">
				<div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
					@radix-ui/colors
				</div>
				<div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
					@stitches/react
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
};

export default CollapsibleCustom;
