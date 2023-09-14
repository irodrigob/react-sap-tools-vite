import { FC } from "react";
import { Card, CardHeader, Icon } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/shipping-status";
import "@ui5/webcomponents-icons/dist/translate";
import AppsList from "sap/general/domain/entities/appsList";
import useSelectApp from "sap/general/infraestructure/frontend/hooks/useSelectApp";

interface Props {
  app: AppsList;
}

const TileApps: FC<Props> = ({ app }) => {
  const { appSelected } = useSelectApp();
  return (
    <Card style={{ marginRight: "1rem" }}>
      <CardHeader
        avatar={<Icon name={app.icon} />}
        titleText={app.appDesc}
        interactive={true}
        onClick={() => {
          //navigate(app.frontendPage);
          appSelected(app.frontendPage, app.app);
        }}
      />
    </Card>
  );
};

export default TileApps;
