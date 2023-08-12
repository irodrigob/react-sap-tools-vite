import React, { useState, createContext, useContext, FC } from "react";
import System from "systems/domain/entities/system";

interface globalContextInterface {
  systemsList: object[];
  setSystemsList: (value: System[]) => void;
  systemsReaded: boolean;
  setSystemsReaded: (value: boolean) => void;
}

// Aquí se crea el contexto. Que se se declará en el fichero ráiz "_app.js" para que los datos sean globales
const GlobalContext = createContext<Partial<globalContextInterface>>({});

interface Props {
  children: React.ReactNode;
}

const GlobalProvider: FC<Props> = (props) => {
  /*************************************
   * Variables
   ************************************/

  const { children } = props;
  const [systemsList, setSystemsList] = useState<System[]>();
  const [systemsReaded, setSystemsReaded] = useState(false);
  /*************************************
   * Funciones
   ************************************/

  /*************************************
   * Efectos
   ************************************/

  return (
    <GlobalContext.Provider
      value={{
        systemsList,
        systemsReaded,
        setSystemsReaded,
        setSystemsList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
export const useGlobalData = () => useContext(GlobalContext);
