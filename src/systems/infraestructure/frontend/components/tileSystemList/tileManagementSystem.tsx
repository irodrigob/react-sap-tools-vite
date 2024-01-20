import { FC, useState } from "react";
import { Card, FlexBox, Icon, CardHeader } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/add";
import "@ui5/webcomponents-icons/dist/settings";
import { Tooltip } from "@mui/material";
import { useTranslations } from "translations/i18nContext";
import ConfigurationOptions from "systems/infraestructure/frontend/components/systemConfiguration/configurationOptions";
import useSystemStore from "systems/infraestructure/frontend/hooks/useSystemsStore";

const TileManagementSystem: FC = () => {
	const [openConfOptions, setOpenConfOptions] = useState(false);
	const { getI18nText } = useTranslations();
	const { setOpenEditSystemAction, setOperationEditAction } = useSystemStore();

	return (
		<>
			<Card style={{ width: "10rem" }}>
				<CardHeader
					titleText={getI18nText("tileSystems.managementTile.title")}
				/>
				<FlexBox
					direction="Row"
					style={{ marginTop: "5.325rem" }}
				>
					<Tooltip title={getI18nText("tileSystems.managementTile.tooltipAdd")}>
						<Icon
							name="add"
							accessibleName={getI18nText(
								"tileSystems.managementTile.tooltipAdd"
							)}
							showTooltip={true}
							onClick={() => {
								setOperationEditAction("Add");
								setOpenEditSystemAction(true);
							}}
							interactive={true}
							style={{
								margin: "1rem",
								width: "1.2rem",
								height: "1.2rem",
							}}
						/>
					</Tooltip>
					<Tooltip
						title={getI18nText(
							"tileSystems.managementTile.tooltipConfiguration"
						)}
					>
						<Icon
							name="settings"
							id="systemConfiguration"
							accessibleName={getI18nText(
								"tileSystems.managementTile.tooltipAdd"
							)}
							interactive={true}
							style={{
								margin: "1rem",
								width: "1.2rem",
								height: "1.2rem",
							}}
							onClick={() => {
								setOpenConfOptions(true);
							}}
						/>
					</Tooltip>
				</FlexBox>
			</Card>
			<ConfigurationOptions
				open={openConfOptions}
				onCloseButton={() => {
					setOpenConfOptions(false);
				}}
			/>
		</>
	);
};

export default TileManagementSystem;
