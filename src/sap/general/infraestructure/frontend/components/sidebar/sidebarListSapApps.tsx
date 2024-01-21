import { FC } from "react";
import { SideNavigationItem } from "@ui5/webcomponents-react";
import { useAppSelector } from "shared/storage/useStore";

const SidebarListSapApps: FC = () => {
	const { appsList } = useAppSelector((state) => state.SAPGeneral);

	return (
		<>
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
		</>
	);
};

export default SidebarListSapApps;
