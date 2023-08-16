import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumbs,
  BreadcrumbsItem,
} from "@ui5/webcomponents-react";
import { useAppSelector } from "shared/storage/useStore";
import { useSystemData } from "systems/infraestructure/context/systemContext";
import { useTranslations } from "translations/i18nContext";
import AppsList from "sap/general/domain/entities/appsList";
import SAPGeneralActions from "sap/general/infraestructure/storage/SAPGeneralActions";

interface NavigationList {
  id: string;
  level: number;
  text: string;
  navigation: () => void;
}

export default function BreadCrumbsNav() {
  const { showSystemList, setShowSystemList } = useSystemData();
  const { showListApps, appsList } = useAppSelector(
    (state) => state.SAPGeneral
  );
  const { getI18nText } = useTranslations();
  const location = useLocation();
  const navigate = useNavigate();
  const sapGeneralActions = new SAPGeneralActions();

  const navigationList = useMemo(() => {
    let temp: NavigationList[] = [];

    // Solo se rellena la tabla si la lista de sistema no se muestra, eso quiere, decir,
    if (!showSystemList) {
      temp.push({
        id: "systems",
        text: getI18nText("breadCrumbsNavigation.systems"),
        level: 1,
        navigation: () => {
          sapGeneralActions.setShowListApps(false);
          setShowSystemList(true);
          navigate("/");
        },
      });

      temp.push({
        id: "apps",
        text: getI18nText("breadCrumbsNavigation.applications"),
        level: 2,
        navigation: () => {
          //dispatch(setShowListApps(true))
          //setShowSystemList(alse)
          navigate("/");
        },
      });

      // Si no se esta el raíz es que se esta en una aplicación
      if (location.pathname !== "/") {
        let app = appsList.find(
          (row: AppsList) => row.frontendPage === location.pathname
        );
        if (app)
          temp.push({
            id: app.frontendPage,
            text: app.appDesc,
            level: 3,
            navigation: () => { },
          });
      }
    }

    return temp;
  }, [showSystemList, showListApps, location, appsList]);
  return (
    <>
      {navigationList.length > 0 && (
        <Breadcrumbs
          separatorStyle="DoubleGreaterThan"
          onItemClick={(event: any) => {
            event.preventDefault();
            let navigationItem = navigationList.find(
              (row: NavigationList) => row.id === event.detail.item.id
            );
            if (navigationItem) navigationItem.navigation();
          }}
        >
          {navigationList.map((row: NavigationList) => {
            return (
              <BreadcrumbsItem key={row.level} id={row.id}>
                {row.text}
              </BreadcrumbsItem>
            );
          })}
        </Breadcrumbs>
      )}
    </>
  );
}
