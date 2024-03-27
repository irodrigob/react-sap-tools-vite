import { FC, ReactNode } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface Props {
	children?: ReactNode;
	nodeKey: string;
	expanded: boolean;
	expandCollapseNode: (key: string) => void;
}
const ComponentLiTree: FC<Props> = ({
	nodeKey,
	children,
	expanded,
	expandCollapseNode,
}) => {
	return (
		<li
			className="hover:bg-slate-800"
			key={nodeKey}
		>
			<div className="flex items-center flex-row h-[2rem]">
				<div className="flex-none">
					<Button
						variant="ghost"
						onClick={() => {
							expandCollapseNode(nodeKey);
						}}
						size="icon"
						className="hover:bg-slate-800"
					>
						{expanded ? (
							<ChevronDownIcon className="h-4 w-4" />
						) : (
							<ChevronRightIcon className="h-4 w-4" />
						)}
					</Button>
				</div>
				{children}
			</div>
		</li>
	);
};

export default ComponentLiTree;
