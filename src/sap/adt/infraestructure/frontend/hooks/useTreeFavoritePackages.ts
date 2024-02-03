import { useCallback } from "react";
import { useAppSelector } from "shared/storage/useStore";
import useAdtStore from "./useAdtStore";
import { TreeAttribute } from "sap/adt/domain/entities/treeAttributes";

export default function useTreeFavoritePackages() {
	const { favoritePackagesTreeAttributes } = useAppSelector(
		(state) => state.ADT
	);
	const { setFavPackageTreeAttributesAction } = useAdtStore();

	const expandCollapseNode = useCallback(
		(node: string) => {
			let newAttributes = [...favoritePackagesTreeAttributes];
			let index = favoritePackagesTreeAttributes.findIndex(
				(row: TreeAttribute) => row.node == node
			);
			if (index != -1)
				newAttributes[index].expanded = !newAttributes[index].expanded;
			else newAttributes.push({ node: node, expanded: true });

			setFavPackageTreeAttributesAction(newAttributes);
		},
		[favoritePackagesTreeAttributes]
	);

	return { expandCollapseNode };
}
