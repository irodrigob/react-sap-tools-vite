import { FC, useCallback, useEffect, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export type TabDefinition = {
	key: string;
	description: string;
};
export type TabDefinitionArray = TabDefinition[];

interface Props {
	defaultValue?: string;
	tabs: TabDefinitionArray;
	onTabChange?: (tab: TabDefinition) => void;
	onCloseTab?: (tab: TabDefinition) => void;
}

// activo: 	className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
// normal: className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"

const TabList: FC<Props> = ({
	tabs,
	defaultValue,
	onTabChange,
	onCloseTab,
}) => {
	const [tabActive, setTabActive] = useState("");

	/**
	 * Efecto que detecta que cambia la pestaña activa por el valor por defecto. Sirve para dos motivos:
	 * 1) Al inicio del componente si no hay nada activo o valor por defecto poner al menos la primera pestaña activa
	 * 2) Si desde fuera del componente se cambia el valor que también cambie en este contro
	 */
	useEffect(() => {
		if (tabActive != defaultValue) {
			if (defaultValue != "") setTabActive(defaultValue as string);
			else if (tabs.length > 0) setTabActive(tabs[0].key);
		}
	}, [defaultValue, tabActive]);

	const getClassnameTab = useCallback((isActive: boolean) => {
		return isActive
			? " p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
			: " p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
	}, []);
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
	);

	return (
		<>
			{tabs.length > 0 && (
				<ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
					{tabs.map((row) => {
						return (
							<li
								key={row.key}
								className={cn(
									"flex flex-row items-center",
									getClassnameTab(row.key == tabActive)
								)}
							>
								<button onClick={handlerOnSelectTab(row)}>
									{row.description}
								</button>
								{onCloseTab && (
									<button
										className="ml-4 h-4 w-4 hover:text-red-600"
										onClick={handlerOnCloseTab(row)}
									>
										<Cross2Icon />
									</button>
								)}
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
};

export default TabList;
