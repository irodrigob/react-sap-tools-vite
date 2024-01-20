import { FC, useEffect } from "react";
import { BusyIndicator, Title } from "@ui5/webcomponents-react";
import Grid from "@mui/material/Unstable_Grid2";
import AppsList from "sap/general/domain/entities/appsList";
import { useTranslations } from "translations/i18nContext";
import TileApps from "./tileApps";
import useSAPGeneralStore from "sap/general/infraestructure/frontend/hooks/useSAPGeneralStore";
import { useAppSelector } from "shared/storage/useStore";
import useSAPGeneral from "sap/general/infraestructure/frontend/hooks/useSAPGeneral";

const TileAppsListContainer: FC = () => {
	const { loadingListApps, appsList } = useAppSelector(
		(state) => state.SAPGeneral
	);
	const {
		setShowListAppsAction,
		setLoadingListAppsAction,
		addAdtApp2StoreAction,
		setURLODataCoreAction,
	} = useSAPGeneralStore();
	const { initialServicesSAPTools } = useSAPGeneral();
	const { getI18nText } = useTranslations();

	useEffect(() => {
		if (loadingListApps) {
			initialServicesSAPTools();
		}
	}, [loadingListApps]);

	return (
		<>
			{loadingListApps && (
				<Grid
					container
					direction="row"
					justifyContent="center"
				>
					<Grid
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<BusyIndicator
							active={loadingListApps}
							size="Large"
						>
							<Title
								level="H2"
								style={{ marginTop: "5rem" }}
							>
								{getI18nText("listApps.loadingApps")}
							</Title>
						</BusyIndicator>
					</Grid>
				</Grid>
			)}
			{appsList && !loadingListApps && (
				<div style={{ marginLeft: "0.5rem" }}>
					<Grid
						container
						spacing={2}
						direction="row"
						xs={12}
					>
						{appsList.map((row: AppsList) => {
							return (
								<Grid key={row.app}>
									<TileApps app={row} />
								</Grid>
							);
						})}
					</Grid>
				</div>
			)}
		</>
	);
};

export default TileAppsListContainer;
