import { FC, ReactNode } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

interface Props {
	text: string;
	children: ReactNode;
	side?: "top" | "right" | "bottom" | "left" | undefined;
}
const TooltipCustom: FC<Props> = ({ children, text, side }) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent side={side}>{text}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default TooltipCustom;
