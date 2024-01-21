import { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
	SideNavigation,
	SideNavigationItem,
	BusyIndicator,
	Ui5CustomEvent,
	SideNavigationDomRef,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/AllIcons";
import { useTranslations } from "translations/i18nContext";
import AppsList from "sap/general/domain/entities/appsList";
import { useAppSelector } from "shared/storage/useStore";
import useSAPGeneralStore from "sap/general/infraestructure/frontend/hooks/useSAPGeneralStore";
interface Props {
	appsList: AppsList[];
}

const ListApps: FC<Props> = (props) => {
	const { appsList } = props;
	const { getI18nText } = useTranslations();
	const navigate = useNavigate();
	const { setShowListAppsAction } = useSAPGeneralStore();

	const { loadingListApps } = useAppSelector((state) => state.SAPGeneral);

	return (
		<BusyIndicator
			active={loadingListApps}
			text={getI18nText("systemSelect.loadingSystemData")}
		>
			<SideNavigation
				style={{ border: "0px" }}
				onSelectionChange={(
					event: Ui5CustomEvent<
						SideNavigationDomRef,
						{
							item: HTMLElement;
						}
					>
				) => {
					setShowListAppsAction(false);
					navigate(event.detail.item.id);
				}}
			>
				{appsList &&
					appsList.map((row) => {
						return (
							<SideNavigationItem
								key={row.app}
								text={row.appDesc == "" ? row.app : row.appDesc}
								icon={row.icon}
								id={row.frontendPage}
							/>
						);
					})}
			</SideNavigation>
		</BusyIndicator>
	);
};

export default ListApps;
