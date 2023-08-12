import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, Icon } from "@ui5/webcomponents-react";
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
          appSelected(app.frontendPage);
        }}
      />
    </Card>
  );
};

export default TileApps;
