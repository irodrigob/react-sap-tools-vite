import { useEffect } from "react";
import { useTranslations } from "translations/i18nContext";
import TileSystemListContainer from "systems/infraestructure/frontend/components/tileSystemList/tileSystemListContainer";
import TileAppsListContainer from "sap/general/infraestructure/frontend/components/tileAppsList/tileAppsListContainer";
import { useSystemData } from "systems/infraestructure/context/systemContext";
import { useAppSelector } from "shared/storage/useStore";

export default function Main() {
  const { getI18nText } = useTranslations();
  const { showSystemList } = useSystemData();
  const { showListApps } = useAppSelector((state) => state.SAPGeneral);

  useEffect(() => {
    document.title = getI18nText("app.title");
  }, []);


  return (
    <>
      {showSystemList && <TileSystemListContainer />}
      {showListApps && <TileAppsListContainer />}

    </>
  );
}
