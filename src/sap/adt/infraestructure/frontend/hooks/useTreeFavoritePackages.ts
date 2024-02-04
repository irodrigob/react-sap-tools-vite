import { useCallback } from "react";
import { useAppSelector } from "shared/storage/useStore";
import useAdtStore from "./useAdtStore";
import { TreeAttributeMap } from "sap/adt/infraestructure/types/tree";

export default function useTreeFavoritePackages() {
	const {} = useAppSelector((state) => state.ADT);
	const {} = useAdtStore();

	const expandCollapseNode = useCallback(
		(node: string, treeAttributeMap: TreeAttributeMap): TreeAttributeMap => {
			let newTreeAttributes = { ...treeAttributeMap };
			if (newTreeAttributes[node])
				newTreeAttributes[node].expanded = !newTreeAttributes[node].expanded;
			else
				newTreeAttributes = { ...treeAttributeMap, [node]: { expanded: true } };

			return newTreeAttributes;
		},
		[]
	);

	return { expandCollapseNode };
}
