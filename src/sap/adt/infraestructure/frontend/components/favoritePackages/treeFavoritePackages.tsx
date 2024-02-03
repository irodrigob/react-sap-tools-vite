import { FC, useState } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
	ADTFavoritePackages,
	ADTFavoritePackage,
} from "sap/adt/domain/entities/favoritePackage";

interface Props {
	favoritePackages: ADTFavoritePackages;
}

const TreeFavoritePackages: FC<Props> = ({ favoritePackages }) => {
	const [openChildren, setOpenChildren] = useState(false);
	return (
		<ul className="list-none [&>li]:mt-1">
			{favoritePackages.map((rowFavoritePackage: ADTFavoritePackage) => {
				return (
					<li
						key={rowFavoritePackage.packageName}
						className="hover:bg-slate-800"
					>
						<div className="flex items-center flex-row">
							<div className="flex-none">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => {
										setOpenChildren(!openChildren);
									}}
								>
									{openChildren && <ChevronDownIcon className="h-4 w-4" />}
									{!openChildren && <ChevronRightIcon className="h-4 w-4" />}
								</Button>
							</div>
							<div className="shrink px-2 text-sm">
								{rowFavoritePackage.packageName}
							</div>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

export default TreeFavoritePackages;
