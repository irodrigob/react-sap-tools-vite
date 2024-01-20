import { FC, useCallback, useState } from "react";
import { Icon, FlexBox } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/download-from-cloud";
import "@ui5/webcomponents-icons/dist/download";
import "@ui5/webcomponents-icons/dist/delete";
import { Tooltip } from "@mui/material";
import System from "systems/domain/entities/system";
import useMessages, {
	MessageType,
} from "shared/infraestructure/hooks/useMessages";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import type { responseSystemRepo } from "systems/infraestructure/types/application";
import TunnelController from "tunnelSystem/infraestructure/controller/tunnelController";
import SystemController from "systems/infraestructure/controller/systemController";
import { useTranslations } from "translations/i18nContext";
import useSystems from "systems/infraestructure/frontend/hooks/useSystems";
import { useSystemData } from "systems/infraestructure/context/systemContext";
import ConfirmDeleteSystem from "./confirmDeleteSystem";
import useSystemStore from "systems/infraestructure/frontend/hooks/useSystemsStore";

interface Props {
	system: System;
}

const TileActions: FC<Props> = (props) => {
	const { system } = props;
	const tunnelController = new TunnelController();
	const { tunnelConfiguration } = useSystemData();
	const { getI18nText } = useTranslations();
	const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
	const systemController = new SystemController();
	const { showMessage } = useMessages();
	const { deleteSystem } = useSystems();
	const {
		setOpenEditSystemAction,
		setOperationEditAction,
		setSystemEditAction,
	} = useSystemStore();

	const handlerRowSystem = useCallback((action: string, system: System) => {
		if (action == "OK") {
			systemController
				.deleteSystem(system._id)
				.then((response: responseSystemRepo) => {
					if (response.isSuccess) {
						let deletedSystem = response.getValue() as System;

						showMessage(
							getI18nText("editSystem.deleteSuccess", {
								system: deletedSystem.name,
							}),
							MessageType.success
						);

						deleteSystem(deletedSystem._id);
					} else if (response.isFailure) {
						showMessage(
							getI18nText("editSystem.errorCallServiceNew", {
								errorService: (
									response.getErrorValue() as ErrorGraphql
								).getError().singleMessage,
							}),
							MessageType.error
						);
					}
				});
		}

		setOpenDeleteConfirm(false);
	}, []);

	return (
		<>
			<FlexBox direction="Row">
				{system.use_connection_tunnel && (
					<>
						<Tooltip
							title={getI18nText(
								"tileSystems.tileSystem.tooltipDownloadTunnelDocker"
							)}
							placement="bottom-start"
						>
							<Icon
								name="download-from-cloud"
								showTooltip={true}
								interactive={true}
								style={{ margin: "1rem", width: "1.2rem", height: "1.2rem" }}
								onClick={() => {
									tunnelController.downloadLaunchTunnelConnectionDocker(
										system.name,
										system.host,
										tunnelConfiguration
									);
								}}
							/>
						</Tooltip>
						<Tooltip
							title={getI18nText(
								"tileSystems.tileSystem.tooltipDownloadTunnelExe"
							)}
							placement="bottom-start"
						>
							<Icon
								name="download"
								showTooltip={true}
								interactive={true}
								style={{ margin: "1rem", width: "1.2rem", height: "1.2rem" }}
								onClick={() => {
									tunnelController.downloadLaunchTunnelConnectionExe(
										system.name,
										system.host,
										tunnelConfiguration
									);
								}}
							/>
						</Tooltip>
					</>
				)}
				<Tooltip
					title={getI18nText("tileSystems.tileSystem.tooltipEdit")}
					placement="bottom-start"
				>
					<Icon
						name="edit"
						showTooltip={false}
						interactive={true}
						style={{ margin: "1rem", width: "1.2rem", height: "1.2rem" }}
						onClick={() => {
							setOperationEditAction("Edit");
							setSystemEditAction(system);
							setOpenEditSystemAction(true);
						}}
					/>
				</Tooltip>
				<Tooltip
					title={getI18nText("tileSystems.tileSystem.toolTipDelete")}
					placement="bottom-start"
				>
					<Icon
						name="delete"
						design="Negative"
						showTooltip={false}
						interactive={true}
						style={{ margin: "1rem", width: "1.2rem", height: "1.2rem" }}
						onClick={() => {
							setOpenDeleteConfirm(true);
						}}
					/>
				</Tooltip>
			</FlexBox>

			<ConfirmDeleteSystem
				open={openDeleteConfirm}
				onClose={handlerRowSystem}
				system={system}
			/>
		</>
	);
};

export default TileActions;
