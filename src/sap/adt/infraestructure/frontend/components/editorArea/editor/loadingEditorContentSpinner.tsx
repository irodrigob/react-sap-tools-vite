import { FC } from "react";
import { useTranslations } from "translations/i18nContext";
import { LoadingSpinner } from "shared/frontend/components/loadingSpinner";

interface Props {
	objectName: string;
}
const LoadingEditorContentSpinner: FC<Props> = ({ objectName }) => {
	const { getI18nText } = useTranslations();

	return (
		<div className="flex align-middle justify-center h-48">
			<LoadingSpinner
				className=""
				size={32}
				text={getI18nText("adtIde.editor.loadingContent", {
					objectName: objectName,
				})}
			/>
		</div>
	);
};
export default LoadingEditorContentSpinner;
