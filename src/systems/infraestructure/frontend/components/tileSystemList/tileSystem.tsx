import { FC } from "react";
import { Icon } from "@ui5/webcomponents-react";
import { Card, CardHeader } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/connected";
import "@ui5/webcomponents-icons/dist/begin";
import System from "systems/domain/entities/system";
import TileData from "./tileData";
import TileActions from "./tileActions";
import useSystems from "systems/infraestructure/frontend/hooks/useSystems";
import { useTranslations } from "translations/i18nContext";
import { Tooltip } from "@mui/material";

interface Props {
  system: System;
  onClick: (system: System) => void;
}

const TileSystem: FC<Props> = (props) => {
  const { system, onClick } = props;
  const { getI18nText } = useTranslations();
  const { processSelectedSystem, isSystemSelected } = useSystems();
  const systemSelected = isSystemSelected(system._id);

  return (
    <Card>
      <CardHeader
        id={system._id}
        titleText={
          systemSelected
            ? `${system.name} ${getI18nText(
                "systemSelect.sufixSystemSelected"
              )}`
            : system.name
        }
        interactive={true}
        action={
          <Tooltip title={getI18nText("tileSystems.tileSystem.tooltipConnect")}>
            <Icon name={systemSelected ? "connected" : "begin"} />
          </Tooltip>
        }
        onClick={() => {
          processSelectedSystem(system);
        }}
      />
      <TileData system={system} />
      <TileActions system={system} />
    </Card>
  );
};

export default TileSystem;
