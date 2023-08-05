import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useMemo,
  useEffect,
} from "react";
import { useTranslations } from "../translations/i18nContext";

interface authContextInterface {
  clientId: string;
  //status: STATUS;
  //setStatus: (value: STATUS) => void;
  session: any;
  setSession: (value: any) => void;
  scriptLoadSuccess: boolean;
  scriptLoadError: boolean;
  loginSuccess: (credentials: any) => void;
  loginError: (error?: any) => void;
}

const AuthContext = createContext<authContextInterface>({
  clientId: "",
  //status: STATUS.NO_AUTH,
  //setStatus: () => {},
  session: "",
  setSession: () => {},
  scriptLoadSuccess: false,
  scriptLoadError: false,
  loginSuccess: () => {},
  loginError: () => {},
});

interface Props {
  client_id: string;
  children?: ReactNode;
}

export const AuthProvider: FC<Props> = (props: Props) => {
  const { client_id, children } = props;
  const [session, setSession] = useState<any>();
  //const [status, setStatus] = useState<STATUS>(STATUS.NO_AUTH);
  const [scriptLoadSuccess, setScriptLoadSuccess] = useState(false);
  const [scriptLoadError, setScriptLoadError] = useState(false);
  const { getI18nText } = useTranslations();

  console.log(getI18nText("app.title"));

  //const { promptLogin } = useGoogle(client_id);
  /*************************************
   * Efectos
   ************************************/
  /*
  useEffect(() => {
    loadGSIScript(
      () => {
        setScriptLoadSuccess(true);
      },
      () => {
        setScriptLoadError(true);
      }
    );

    return () => {
      const scriptTag = document.querySelector(
        `script[src="${GOOGLE_URL_SCRIPT}"]`
      );
      if (scriptTag) document.body.removeChild(scriptTag);
    };
  }, []);
*/
  const clientId = useMemo(() => {
    return "";
  }, []);

  /*************************************
   * Funciones
   ************************************/

  /**
   * Captura cuando se hace login y guarda las credenciales y actualiza
   * el estado
   * @param {object} credentials | Credenciales de la autentificación
   */

  const loginSuccess = (credentials: any) => {
    //setStatus(STATUS.AUTH);
    //setSession(credentials);
  };

  /**
   * Captura cuando se produce un error al loguearse.
   */

  const loginError = () => {
    //    setStatus(STATUS.NO_AUTH);
    //   setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        clientId,
        //status,
        //setStatus,
        session,
        setSession,
        scriptLoadSuccess,
        scriptLoadError,
        loginSuccess,
        loginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useSession = () => useContext(AuthContext);
