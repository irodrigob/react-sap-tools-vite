import { useEffect, FC } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { BusyIndicator } from "@ui5/webcomponents-react";
import System from "systems/domain/entities/system";
import { useSystemData } from "systems/infraestructure/context/systemContext";
import useSystems from "systems/infraestructure/frontend/hooks/useSystems";
import TileSystem from "./tileSystem";
import TileManagementSystem from "./tileManagementSystem";
import { useTranslations } from "translations/i18nContext";
import { useSession } from "auth/authProvider";
import DialogEditSystem from "systems/infraestructure/frontend/components/dialogEditSystem/dialogEditSystemContainer";

const TileSystemListContainer: FC = () => {
  const { systemsList, loadingSystems, setLoadingSystems, loadSystemList } =
    useSystemData();
  const { processSelectedSystem, readSystemsUser } = useSystems();
  const { getI18nText } = useTranslations();
  const { session } = useSession();

  useEffect(() => {
    if (session?.email && loadSystemList) {
      setLoadingSystems(true);
      readSystemsUser(session.email);
    }
  }, [session, loadSystemList]);

  return (
    <>
      <Grid container spacing={2} direction="row">
        <Grid>
          <TileManagementSystem />
        </Grid>
        {!loadingSystems &&
          systemsList &&
          systemsList.map((system: System) => {
            return (
              <Grid key={system._id}>
                <TileSystem
                  system={system}
                  onClick={(system) => {
                    processSelectedSystem(system);
                  }}
                />
              </Grid>
            );
          })}

        {loadingSystems && (
          <Grid
            xs={10}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <BusyIndicator
              active
              size="Large"
              text={getI18nText("systemSelect.loading")}
            />
          </Grid>
        )}
      </Grid>
      <DialogEditSystem />
    </>
  );
};

export default TileSystemListContainer;
