import { FC } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { AdtPackageObjectTypes } from "sap/adt/domain/entities/packageContent";
import ObjectsList from "./objectList";
import useFavoritePackages from "@/sap/adt/infraestructure/frontend/hooks/useFavoritePackages";
import { useAppSelector } from "shared/storage/useStore";

interface Props {
	packageName: string;
	category: string;
	objectTypes: AdtPackageObjectTypes;
}
const ObjectTypesList: FC<Props> = ({ packageName, category, objectTypes }) => {
	const { treeAttributesMap } = useAppSelector((state) => state.ADT);

	const { expandCollapseNode } = useFavoritePackages();
	return (
		<div className="ml-3">
			{objectTypes.map((row) => {
				const nodeKey = `${packageName}_${category}_${row.objectType}`;

				return (
					<div key={`${nodeKey}`}>
						<li
							className="hover:bg-slate-800"
							key={nodeKey}
						>
							<div className="flex items-center flex-row">
								<div className="flex-none">
									{row.objects.length > 0 && (
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
								<div className="shrink text-sm w-52">{row.objectTypeDesc}</div>
								<div className="grow">
									<div className="flex items-center justify-between flex-row-reverse"></div>
								</div>
							</div>
						</li>
						<div key={`${nodeKey}_content`}>
							{treeAttributesMap[nodeKey] &&
								treeAttributesMap[nodeKey].expanded && (
									<ObjectsList
										packageName={packageName}
										category={category}
										objectType={row}
									/>
								)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ObjectTypesList;
