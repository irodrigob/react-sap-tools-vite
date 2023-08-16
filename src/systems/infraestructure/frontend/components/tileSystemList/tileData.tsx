import { FC, useEffect, useState } from "react";
import { FlexBox, Text, Label, Icon } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/cloud-check";
import "@ui5/webcomponents-icons/dist/decline";
import { Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import System from "systems/domain/entities/system";
import { useTranslations } from "translations/i18nContext";

interface Props {
  system: System;
}

const TileData: FC<Props> = (props) => {
  const { system } = props;
  const { getI18nText } = useTranslations();

  const theme = useTheme();
  const mediaXL = useMediaQuery(theme.breakpoints.up("xl"));
  const mediaMD = useMediaQuery(theme.breakpoints.up("md"));
  const mediaLG = useMediaQuery(theme.breakpoints.up("lg"));
  const mediaSM = useMediaQuery(theme.breakpoints.up("sm"));
  const [subtitleWidth, setSubtitleWidth] = useState("12rem");

  useEffect(() => {
    if (mediaXL) setSubtitleWidth("14rem");
    else if (mediaLG) setSubtitleWidth("14rem");
    else if (mediaMD) setSubtitleWidth("12rem");
    else if (mediaSM) setSubtitleWidth("12rem");
  }, [mediaXL, mediaMD, mediaLG, mediaSM]);

  return (
    <FlexBox
      direction="Column"
      style={{ paddingLeft: "1rem", paddingBottom: "1rem" }}
    >
      <FlexBox direction="Row">
        <Label
          showColon={true}
          for="txtHost"
          style={{
            marginRight: "0.5rem",
            marginBottom: "0.1rem",
          }}
        >
          {getI18nText("tileSystems.tileSystem.labelHost")}
        </Label>
        <Tooltip title={system.host} placement="bottom-start">
          <Text
            aria-label={system.sap_user}
            id="txtHost"
            style={{ width: subtitleWidth }}
            wrapping={false}
          >
            {system.host}
          </Text>
        </Tooltip>
      </FlexBox>
      <FlexBox direction="Row">
        <Label
          showColon={true}
          for="txtSAPUser"
          style={{
            marginRight: "0.5rem",
            marginBottom: "0.1rem",
          }}
        >
          {getI18nText("tileSystems.tileSystem.labelSAPUser")}
        </Label>
        <Text aria-label={system.sap_user} id="txtSAPUser">
          {system.sap_user}
        </Text>
      </FlexBox>
      <FlexBox direction="Row">
        <Label
          showColon={true}
          for="iconTunnel"
          style={{ marginRight: "0.5rem" }}
        >
          {getI18nText("tileSystems.tileSystem.labelConnectionTunnel")}
        </Label>
        <Icon
          name={
            (system.use_connection_tunnel as boolean)
              ? "cloud-check"
              : "decline"
          }
          id="iconTunnel"
        />
      </FlexBox>
    </FlexBox>
  );
};

export default TileData;
