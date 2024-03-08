import { useCallback } from "react";
import { useAppSelector } from "shared/storage/useStore";
import { TreeAttributeMap } from "sap/adt/infraestructure/types/tree";
import useAdtStore from "./useAdtStore";

/**
 * Utilidades generales para componentes Tree
 */
export default function useTree() {
	const { treeAttributesMap } = useAppSelector((state) => state.ADT);
	const { setAttributesMapAction } = useAdtStore();

	const expandCollapseNode = useCallback(
		(node: string): TreeAttributeMap => {
			let newTreeAttributes = structuredClone(treeAttributesMap);
			if (newTreeAttributes[node])
				newTreeAttributes[node].expanded = !newTreeAttributes[node].expanded;
			else
				newTreeAttributes = {
					...treeAttributesMap,
					[node]: { expanded: true },
				};
			setAttributesMapAction(newTreeAttributes);
			return newTreeAttributes;
		},
		[treeAttributesMap]
	);

	return { expandCollapseNode };
}
