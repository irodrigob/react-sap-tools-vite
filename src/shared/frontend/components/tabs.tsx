import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface TabsProps {
	children: ReactNode;
	className?: string;
}
const Tabs: FC<TabsProps> = ({ ...props }) => {
	return <section {...props}>{props.children}</section>;
};

interface TabsListProps {
	children: ReactNode;
}

const TabsList: FC<TabsListProps> = ({ children }) => {
	return (
		<ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
			{children}
		</ul>
	);
};

interface TabItemProps {
	key: string;
	value: string;
	active: boolean;
	onSelectedTab: (tab: string) => void;
	onCloseTab?: (tab: string) => void;
	children?: ReactNode;
}

const TabItem: FC<TabItemProps> = ({
	active,
	value,
	onCloseTab,
	onSelectedTab,
	...props
}) => {
	const [showCloseButton, setShowCloseButton] = useState("invisble");

	const getClassnameTab = useCallback((isActive: boolean) => {
		return isActive
			? "pt-1 pb-2 border-b-2 rounded-t-lg text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
			: "pt-1 pb-2 border-b-2 rounded-t-lg border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
	}, []);

	useEffect(() => {
		active && onCloseTab
			? setShowCloseButton("visible")
			: setShowCloseButton("invisible");
	}, [active]);

	return (
		<span
			className="pl-2 mr-4"
			onMouseOver={() => {
				setShowCloseButton("visible");
			}}
			onMouseOut={() => {
				if (!active) setShowCloseButton("invisible");
			}}
		>
			<li
				{...props}
				className={cn("flex flex-row items-center", getClassnameTab(active))}
			>
				<button
					onClick={() => {
						onSelectedTab(value);
					}}
				>
					{props.children}
				</button>
				{onCloseTab && (
					<button
						className={cn("ml-4 h-4 w-4 hover:text-red-600", showCloseButton)}
						onClick={() => {
							onCloseTab(value);
						}}
					>
						<Cross2Icon />
					</button>
				)}
			</li>
		</span>
	);
};

interface TabContentProps {
	children?: ReactNode;
}
const TabContent: FC<TabContentProps> = ({ ...props }) => {
	return (
		<div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
			{props.children}
		</div>
	);
};

export { TabsList, TabItem, TabContent, Tabs };
