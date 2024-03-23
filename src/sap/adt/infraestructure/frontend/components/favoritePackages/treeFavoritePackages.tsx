import { FC, useCallback, useState } from "react";
import {
	ChevronRightIcon,
	ChevronDownIcon,
	ArchiveIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
	ADTFavoritePackages,
	ADTFavoritePackage,
} from "sap/adt/domain/entities/favoritePackage";
import EliminateFavorite from "shared/frontend/icons/eliminate-Favorite";
import PopupDeleteFavoritePackage from "./popupDeleteFavoritePackage";
import PackageContentContainer from "./packageContent/packageContentContainer";
import { INIT_FAVORITE_PACKAGE } from "sap/adt/infraestructure/constants/treeConstants";
import useFavoritePackages from "sap/adt/infraestructure/frontend/hooks/useFavoritePackages";
import { useAppSelector } from "shared/storage/useStore";
import useTree from "sap/adt/infraestructure/frontend/hooks/useTree";

interface Props {
	favoritePackages: ADTFavoritePackages;
}

const TreeFavoritePackages: FC<Props> = ({ favoritePackages }) => {
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [packageSelected, setPackageSelected] = useState<ADTFavoritePackage>(
		INIT_FAVORITE_PACKAGE
	);
	const { getPackageContent } = useFavoritePackages();
	const { treeAttributesMap } = useAppSelector((state) => state.ADT);
	const { expandCollapseNode } = useTree();

	const handlerExpandPackage = useCallback(
		(rowFavoritePackage: ADTFavoritePackage) => {
			expandCollapseNode(rowFavoritePackage.packageName);

			if (!rowFavoritePackage.loadedContent)
				getPackageContent(rowFavoritePackage.packageName);
		},
		[favoritePackages, treeAttributesMap]
	);
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
											onClick={() => {
												handlerExpandPackage(rowFavoritePackage);
											}}
											size="icon"
											className="h-2"
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
									<div className="shrink text-sm w-52">
										<div className="flex items-center flex-row space-x-2">
											<ArchiveIcon className="h-4 w-4" />
											<span>{rowFavoritePackage.packageName}</span>
										</div>
									</div>
									<div className="grow">
										<div className="flex items-center justify-between flex-row-reverse">
											{
												// Si no hay ID es añadido manualmente y no se tiene que mostrar el icono
												rowFavoritePackage._id != "" && (
													<Button
														variant="ghost"
														size="icon"
													>
														<EliminateFavorite
															className="h-5 w-5 text-red-500"
															onClick={() => {
																setPackageSelected(rowFavoritePackage);
																setOpenDeleteDialog(true);
															}}
														/>
													</Button>
												)
											}
										</div>
									</div>
								</div>
							</li>
							<div key={`${rowFavoritePackage.packageName}_content`}>
								{treeAttributesMap[rowFavoritePackage.packageName] &&
									treeAttributesMap[rowFavoritePackage.packageName]
										.expanded && (
										<PackageContentContainer
											favoritePackage={rowFavoritePackage}
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
