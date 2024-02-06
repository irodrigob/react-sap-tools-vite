import { FC } from "react";
import { LoadingSpinner } from "shared/frontend/components/loadingSpinner";

interface Props {
	packageName: string;
}
const PackageContentContainer: FC<Props> = ({ packageName }) => {
	return (
		<div className="flex items-center grow ml-11 py-2">
			<p>Datos</p>
		</div>
	);
};

export default PackageContentContainer;
