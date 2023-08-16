import { FC } from "react";
import { SideNavigationItem } from "@ui5/webcomponents-react";
import SAPController from "sap/general/infraestructure/controller/sapController";

const SidebarListSapApps: FC = () => {
  const sapController = new SAPController();
  const appsList = sapController.getAppList();

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
