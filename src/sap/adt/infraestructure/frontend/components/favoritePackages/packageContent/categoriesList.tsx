import { FC } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { AdtPackageCategories } from "sap/adt/domain/entities/packageContent";
import ObjectTypesList from "./objectTypesList";
import ObjectsList from "./objectList";
import { CATEGORIES_SHOW_OBJECTLIST } from "sap/adt/infraestructure/constants/adtConstants";
import useTree from "sap/adt/infraestructure/frontend/hooks/useTree";
import { useAppSelector } from "shared/storage/useStore";

interface Props {
	packageName: string;
	categories: AdtPackageCategories;
}
const CategoriesList: FC<Props> = ({ packageName, categories }) => {
	const { treeAttributesMap } = useAppSelector((state) => state.ADT);
	const { expandCollapseNode } = useTree();

	return (
		<>
			{categories.map((row) => {
				const nodeKey = `${packageName}_${row.category}`;
				// Hay categorias como las clases de mensajes no tiene subobjetos como un diccionario y se tiene
				// que mostrar directamente la lista de objetos.
				const showObjectList =
					CATEGORIES_SHOW_OBJECTLIST.findIndex(
						(rowShow) => rowShow == row.category
					) != -1
						? true
						: false;
				return (
					<div key={`${nodeKey}`}>
						<li
							className="hover:bg-slate-800"
							key={nodeKey}
						>
							<div className="flex items-center flex-row">
								<div className="flex-none">
									{row.objectTypes.length > 0 && (
										<Button
											variant="ghost"
											size="icon"
											onClick={() => {
												expandCollapseNode(nodeKey);
											}}
											className="h-2"
										>
											{treeAttributesMap[nodeKey] &&
											treeAttributesMap[nodeKey].expanded ? (
												<ChevronDownIcon className="h-4 w-4" />
											) : (
												<ChevronRightIcon className="h-4 w-4" />
											)}
										</Button>
									)}
								</div>
								<div className="shrink text-sm w-52">{row.categoryDesc}</div>
								<div className="grow">
									<div className="flex items-center justify-between flex-row-reverse"></div>
								</div>
							</div>
						</li>
						<div key={`${nodeKey}_content`}>
							{treeAttributesMap[nodeKey] &&
								treeAttributesMap[nodeKey].expanded && (
									<>
										{showObjectList ? (
											<ObjectsList
												packageName={packageName}
												category={row.category}
												objectType={row.objectTypes[0]}
											/>
										) : (
											<ObjectTypesList
												packageName={packageName}
												category={row.category}
												objectTypes={row.objectTypes}
											/>
										)}
									</>
								)}
						</div>
					</div>
				);
			})}
		</>
	);
};

export default CategoriesList;
