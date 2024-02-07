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
import PopupDeleteFavoritePackage from "./popupDeleteFavoritePackage";
import PackageContentContainer from "./packageContent/packageContentContainer";

interface Props {
	favoritePackages: ADTFavoritePackages;
}

const TreeFavoritePackages: FC<Props> = ({ favoritePackages }) => {
	const [treeAttributesMap, setTreeAttributesMap] = useState<TreeAttributeMap>(
		{}
	);
	const { expandCollapseNode } = useTreeFavoritePackages();
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [packageSelected, setPackageSelected] = useState<ADTFavoritePackage>({
		_id: "",
		packageName: "",
		content: [],
	});

	return (
		<>
			<ul className="list-none">
				{favoritePackages.map((rowFavoritePackage: ADTFavoritePackage) => {
					return (
						<div key={`${rowFavoritePackage.packageName}_container`}>
							<li
								className="hover:bg-slate-800"
								key={rowFavoritePackage.packageName}
							>
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
												<ChevronDownIcon className="h-5 w-5" />
											) : (
												<ChevronRightIcon className="h-5 w-5" />
											)}
										</Button>
									</div>
									<div className="shrink text-sm w-52">
										{rowFavoritePackage.packageName}
									</div>
									<div className="grow">
										<div className="flex items-center justify-between flex-row-reverse">
											<Button
												variant="ghost"
												size="sm"
											>
												<EliminateFavorite
													className="h-5 w-5"
													onClick={() => {
														setPackageSelected(rowFavoritePackage);
														setOpenDeleteDialog(true);
													}}
												/>
											</Button>
										</div>
									</div>
								</div>
							</li>
							<div key={`${rowFavoritePackage.packageName}_content`}>
								{treeAttributesMap[rowFavoritePackage.packageName] &&
									treeAttributesMap[rowFavoritePackage.packageName]
										.expanded && (
										<PackageContentContainer
											packageName={rowFavoritePackage.packageName}
										/>
									)}
							</div>
						</div>
					);
				})}
			</ul>
			<PopupDeleteFavoritePackage
				openDialog={openDeleteDialog}
				onOpenChange={setOpenDeleteDialog}
				packageData={packageSelected as ADTFavoritePackage}
			/>
		</>
	);
};

export default TreeFavoritePackages;
