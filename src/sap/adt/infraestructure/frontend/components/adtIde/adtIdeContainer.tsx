import { SplitterElement, SplitterLayout } from "@ui5/webcomponents-react";
import { useEffect } from "react";
import FavoritePackagesContainer from "sap/adt/infraestructure/frontend/components/favoritePackages/favoritePackagesContainer";
import { useAppSelector } from "shared/storage/useStore";
import useAdt from "sap/adt/infraestructure/frontend/hooks/useAdt";

export default function AdtIdeContainer() {
	const { systemChanged, applicationChanged } = useAppSelector(
		(state) => state.SAPGeneral
	);
	const { loadInitialData } = useAdt();

	useEffect(() => {
		if (systemChanged || applicationChanged) {
			loadInitialData();
		}
	}, [systemChanged, applicationChanged]);

	return (
		<SplitterLayout>
			<SplitterElement size="25%">
				<FavoritePackagesContainer />
			</SplitterElement>
			<SplitterElement>
				<p>Codigo</p>
			</SplitterElement>
		</SplitterLayout>
	);
}
