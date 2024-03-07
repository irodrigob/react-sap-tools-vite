import { FC } from "react";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";
import { useAppSelector } from "shared/storage/useStore";

interface Props {
	objectEditor: ADTObjectEditor;
}

const OutlineObject: FC<Props> = ({ objectEditor }) => {
	const { treeAttributesMap } = useAppSelector((state) => state.ADT);
	return <p>hola</p>;
};

export default OutlineObject;
