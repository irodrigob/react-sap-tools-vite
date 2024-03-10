import { FC, ReactNode, useState } from "react";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useTranslations } from "@/translations/i18nContext";
interface Props {
	defaultOpen?: boolean;
	titleCollapsed: string;
	headerToolbar?: ReactNode;
	contentExpanded?: ReactNode;
	contentCollapsed?: ReactNode;
}
const CollapsibleCustom: FC<Props> = (props: Props) => {
	const {
		titleCollapsed,
		headerToolbar,
		contentExpanded,
		contentCollapsed,
		defaultOpen,
	} = props;
	const [isOpen, setIsOpen] = useState<boolean>(
		defaultOpen ? defaultOpen : true
	);
	const { getI18nText } = useTranslations();

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="space-y-1 rounded-md "
		>
			<div className="flex items-center">
				<CollapsibleTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
					>
						{isOpen && <CaretUpIcon className="h-5 w-5" />}
						{!isOpen && <CaretDownIcon className="h-5 w-5" />}
						<span className="sr-only">
							{getI18nText("collapsibleCustom.toggle")}
						</span>
					</Button>
				</CollapsibleTrigger>
				<h4 className="text-lg font-semibold">{titleCollapsed}</h4>
				{headerToolbar && <div className="grow">{headerToolbar}</div>}
			</div>

			{contentCollapsed && (
				<div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
					{contentCollapsed}
				</div>
			)}
			<CollapsibleContent className="space-y-2">
				{contentExpanded}
			</CollapsibleContent>
		</Collapsible>
	);
};

export default CollapsibleCustom;
