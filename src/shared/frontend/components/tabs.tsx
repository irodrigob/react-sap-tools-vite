import { FC, ReactNode, useCallback } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface TabsProps {
	children: ReactNode;
}
const Tabs: FC<TabsProps> = ({ ...props }) => {
	return <section {...props}>{props.children}</section>;
};

interface TabsListProps {
	children: ReactNode;
}

// activo: 	className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
// normal: className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"

const TabsList: FC<TabsListProps> = ({ children }) => {
	/**
	 * Efecto que detecta que cambia la pestaña activa por el valor por defecto. Sirve para dos motivos:
	 * 1) Al inicio del componente si no hay nada activo o valor por defecto poner al menos la primera pestaña activa
	 * 2) Si desde fuera del componente se cambia el valor que también cambie en este contro
	 */
	/*	useEffect(() => {
		if (defaultValue != "") console.log(`Default value: ${defaultValue}`);

		if (tabActive != defaultValue) {
			if (defaultValue != "") setTabActive(defaultValue as string);
			else if (tabs.length > 0) setTabActive(tabs[0].key);
		}
	}, [defaultValue, tabActive]);*/

	/*
	const handlerOnSelectTab = useCallback(
		(tabSelected: TabDefinition) => () => {
			setTabActive(tabSelected.key);

			if (onTabChange) onTabChange(tabSelected);
		},
		[]
	);
	const handlerOnCloseTab = useCallback(
		(tabSelected: TabDefinition) => () => {
			if (onCloseTab) onCloseTab(tabSelected);
		},
		[]
	);*/

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
	const getClassnameTab = useCallback((isActive: boolean) => {
		return isActive
			? " p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
			: " p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
	}, []);

	return (
		<li
			{...props}
			className={(cn("flex flex-row items-center"), getClassnameTab(active))}
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
					className="ml-4 h-4 w-4 hover:text-red-600"
					onClick={() => {
						onCloseTab(value);
					}}
				>
					<Cross2Icon />
				</button>
			)}
		</li>
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
