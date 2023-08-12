import { FC } from "react";
import { Button, Popover } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/menu2";
import "@ui5/webcomponents-icons/dist/shipping-status";
import { useTranslations } from "translations/i18nContext";
import SAPController from "sap/general/infraestructure/controller/sapController";
import ListApps from "./listApps";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { useAppSelector } from "shared/storage/useStore";
import SAPGeneralActions from "sap/general/infraestructure/storage/SAPGeneralActions";

interface Props {}

const SelectAppContainer: FC<Props> = () => {
  const { getI18nText } = useTranslations();
  const sapController = new SAPController();
  const appsList = sapController.getAppList();
  const sapGeneralActions = new SAPGeneralActions();

  const { showListApps } = useAppSelector((state) => state.SAPGeneral);
  const { systemSelected } = useAppSelector((state) => state.System);
  const { showMessage } = useMessages();

  return (
    <>
      {" "}
      <Button
        icon="menu2"
        id="listApps"
        onClick={() => {
          if (systemSelected.name) sapGeneralActions.setShowListApps(true);
          else
            showMessage(
              getI18nText("listApps.systemNotSelected"),
              MessageType.info
            );
        }}
        tooltip={getI18nText("appToolbar.tooltipButtonsApps")}
      />
      <Popover
        opener="listApps"
        open={showListApps}
        placementType="Bottom"
        onAfterClose={() => {
          sapGeneralActions.setShowListApps(false);
        }}
      >
        <ListApps appsList={appsList} />
      </Popover>
    </>
  );
};

export default SelectAppContainer;
