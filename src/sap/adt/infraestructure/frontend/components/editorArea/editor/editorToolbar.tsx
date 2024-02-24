import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";
import Edit from "shared/frontend/icons/edit";

/*

*/
const EditorToolbar: FC = () => {
	return (
		<div className="mb-1 flex flex-col ml-1 w-[99%] border rounded-sm bg-zinc-800 shadow-black">
			<div className="mt-4 mb-4 ml-4">
				<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
					<Button
						variant="ghost"
						onClick={() => {}}
						size="icon"
						className="h-2 "
					>
						<Edit className="h-6 w-6 hover:text-stone-400" />
					</Button>
					<Separator orientation="vertical" />
				</div>
			</div>
		</div>
	);
};

export default EditorToolbar;
