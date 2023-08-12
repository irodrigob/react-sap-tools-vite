import React, { useState, createContext, useContext, FC } from "react";
import System from "systems/domain/entities/system";
import TunnelConfiguration from "tunnelSystem/domain/entities/configuration";
import TunnelProvider from "tunnelSystem/domain/entities/provider";

type Systems = System[];
type tunnelProviders = TunnelProvider[];

export const DEFAULT_SYSTEM = new System("", "", "", "", "", "");
export const DEFAULT_TUNNEL_CONF = new TunnelConfiguration("", "", "", "");
export const DEFAULT_TUNNEL_PROVIDER = new TunnelProvider("", "");

interface systemContextInterface {
  systemsList: Systems;
  setSystemsList: (value: Systems) => void;
  systemsReaded: boolean;
  setSystemsReaded: (value: boolean) => void;
  tunnelConfiguration: TunnelConfiguration;
  setTunnelConfiguration: (value: TunnelConfiguration) => void;
  tunnelProviders: tunnelProviders;
  setTunnelProviders: (value: TunnelProvider[]) => void;
  loadingSystems: boolean;
  setLoadingSystems: (value: boolean) => void;
  expandSidebar: boolean;
  setExpandSidebar: (value: boolean) => void;
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
  showSystemList: boolean;
  setShowSystemList: (value: boolean) => void;
  loadSystemList: boolean;
  setLoadSystemList: (value: boolean) => void;
}

const SystemContext = createContext<systemContextInterface>({
  systemsList: [],
  setSystemsList: (value: Systems) => {},
  systemsReaded: false,
  setSystemsReaded: (value: boolean) => {},
  tunnelConfiguration: DEFAULT_TUNNEL_CONF,
  setTunnelConfiguration: (value: TunnelConfiguration) => {},
  tunnelProviders: [],
  setTunnelProviders: (value: tunnelProviders) => {},
  loadingSystems: false,
  setLoadingSystems: (value: boolean) => {},
  expandSidebar: false,
  setExpandSidebar: (value: boolean) => {},
  showSidebar: false,
  setShowSidebar: (value: boolean) => {},
  showSystemList: false,
  setShowSystemList: (value: boolean) => {},
  loadSystemList: true,
  setLoadSystemList: (value: boolean) => {},
});

interface Props {
  children: React.ReactNode;
}

const SystemProvider: FC<Props> = (props) => {
  /*************************************
   * Variables
   ************************************/

  const { children } = props;
  const [systemsList, setSystemsList] = useState<Systems>([]);

  const [systemsReaded, setSystemsReaded] = useState(false);
  const [tunnelConfiguration, setTunnelConfiguration] =
    useState<TunnelConfiguration>(DEFAULT_TUNNEL_CONF);
  const [tunnelProviders, setTunnelProviders] = useState<TunnelProvider[]>([]);
  const [loadingSystems, setLoadingSystems] = useState(false);
  const [expandSidebar, setExpandSidebar] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSystemList, setShowSystemList] = useState(true);
  const [loadSystemList, setLoadSystemList] = useState(true);

  /*************************************
   * Funciones
   ************************************/

  /*************************************
   * Efectos
   ************************************/
  //
  return (
    <SystemContext.Provider
      value={{
        systemsList,
        setSystemsList,
        systemsReaded,
        setSystemsReaded,
        tunnelConfiguration,
        setTunnelConfiguration,
        tunnelProviders,
        setTunnelProviders,
        loadingSystems,
        setLoadingSystems,
        expandSidebar,
        setExpandSidebar,
        showSidebar,
        setShowSidebar,
        showSystemList,
        setShowSystemList,
        loadSystemList,
        setLoadSystemList,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export default SystemProvider;
export const useSystemData = () => useContext(SystemContext);
