import { FC, useEffect, useState } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
	ADTFavoritePackages,
	ADTFavoritePackage,
} from "sap/adt/domain/entities/favoritePackage";
import { TreeAttributeMap } from "sap/adt/infraestructure/types/tree";
import useTreeFavoritePackages from "sap/adt/infraestructure/frontend/hooks/useTreeFavoritePackages";
import EliminateFavorite from "shared/frontend/icons/eliminate-Favorite";

interface Props {
	favoritePackages: ADTFavoritePackages;
}

const TreeFavoritePackages: FC<Props> = ({ favoritePackages }) => {
	const [treeAttributesMap, setTreeAttributesMap] = useState<TreeAttributeMap>(
		{}
	);
	const { expandCollapseNode } = useTreeFavoritePackages();

	return (
		<ul className="list-none">
			{favoritePackages.map((rowFavoritePackage: ADTFavoritePackage) => {
				return (
					<section key={rowFavoritePackage.packageName}>
						<li className="hover:bg-slate-800">
							<div className="flex items-center flex-row">
								<div className="flex-none">
									<Button
										variant="ghost"
										size="sm"
										onClick={() => {
											setTreeAttributesMap(
												expandCollapseNode(
													rowFavoritePackage.packageName,
													treeAttributesMap
												)
											);
										}}
									>
										{treeAttributesMap[rowFavoritePackage.packageName] &&
										treeAttributesMap[rowFavoritePackage.packageName]
											.expanded ? (
											<ChevronDownIcon className="h-4 w-4" />
										) : (
											<ChevronRightIcon className="h-4 w-4" />
										)}
									</Button>
								</div>
								<div className="shrink px-2 text-sm w-52">
									{rowFavoritePackage.packageName}
								</div>
								<div className="ml-auto">
									<Button
										variant="ghost"
										size="sm"
										className="ml-6"
									>
										<EliminateFavorite className="h-4 w-4 " />
									</Button>
								</div>
							</div>
						</li>
					</section>
				);
			})}
		</ul>
	);
};

export default TreeFavoritePackages;
