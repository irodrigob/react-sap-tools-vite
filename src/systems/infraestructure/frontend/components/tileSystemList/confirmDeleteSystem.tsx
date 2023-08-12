import { FC } from "react";
import { MessageBox } from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";
import System from "systems/domain/entities/system";

interface Props {
  open: boolean;
  onClose: (action: string, system: System) => void;
  system: System;
}
const ConfirmDeleteSystem: FC<Props> = (props) => {
  const { open, onClose, system } = props;
  const { getI18nText } = useTranslations();
  return (
    <MessageBox
      open={open}
      onClose={(event) => {
        onClose(event.detail.action, system);
      }}
      titleText={getI18nText("tileSystems.popupDeleteSystem.title")}
    >
      {getI18nText("tileSystems.popupDeleteSystem.mainText", {
        systemName: system.name,
      })}
    </MessageBox>
  );
};

export default ConfirmDeleteSystem;
