import { FC, useCallback } from "react";
import SelectSectionSource from "./selectSectionSource";
import { useAppSelector } from "shared/storage/useStore";
import useToolbar from "sap/adt/infraestructure/frontend/hooks/useToolbar";
import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";
import useAbapEditor from "shared/frontend/components/abapEditor/useAbapEditor";

interface Props {
	objectEditor: ADTObjectEditor;
}
const ClassToolbar: FC<Props> = ({ objectEditor }) => {
	const { changeSectionSource } = useToolbar();
	const { navigateToTop } = useAbapEditor();

	const handlerChangeSectionSource = useCallback(
		(section: string) => {
			changeSectionSource(objectEditor, section);
			navigateToTop(); // Se navega al principio del codigo
		},
		[objectEditor]
	);

	return (
		<div className="flex items-center justify-center">
			<SelectSectionSource
				sectionSource={objectEditor.sectionSource as string}
				onChangeSection={handlerChangeSectionSource}
			/>
		</div>
	);
};

export default ClassToolbar;
