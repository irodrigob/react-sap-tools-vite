import { FC } from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ADTObjectInfoEditor } from "sap/adt/infraestructure/types/adt";
import useEditorGroup from "sap/adt/infraestructure/frontend/hooks/useEditorGroup";
import { useAppSelector } from "shared/storage/useStore";

interface Props {
	objectInfo: ADTObjectInfoEditor;
	objectKey: string;
}
const TabLabel: FC<Props> = ({ objectInfo, objectKey }) => {
	const { closeTab } = useEditorGroup();
	const { objectKeyActive } = useAppSelector((state) => state.ADT);

	// El data-state lo hago para la pestaña activa porque cuando se cierra la pestaña no cambia el status,
	// por ello hay que forzarlo
	return (
		<div className="flex items-center flex-row ">
			<TabsTrigger
				value={objectKey}
				key={objectKey}
				className="mr-2 hover:bg-gray-700"
				data-state={objectKeyActive == objectKey ? "active" : "inactive"}
			>
				{objectInfo.object.objectName}
			</TabsTrigger>
			<Cross2Icon
				className="mr-2 h-4 w-4 hover:text-red-600"
				onClick={() => {
					closeTab(objectInfo);
				}}
			/>
		</div>
	);
};

export default TabLabel;
