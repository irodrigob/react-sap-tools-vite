import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

interface Props {
	title: string;
}
const TabLabel: FC<Props> = ({ title }) => {
	return (
		<div className="flex items-center flex-row ">
			<span className="text-sm mr-4">{title}</span>
			<Cross2Icon
				className="h-4 w-4 hover:text-red-600"
				onClick={() => {
					alert("cerrar");
				}}
			/>
		</div>
	);
};

export default TabLabel;
