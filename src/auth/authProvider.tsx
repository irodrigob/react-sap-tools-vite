import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useMemo,
  useEffect,
} from "react";
import { loadGSIScript } from "./hooks/useScript";
import { Status } from "./types.d";
import { GOOGLE_URL_SCRIPT } from "./constants";

interface authContextInterface {
  clientId: string;
  status: Status;
  setStatus: (value: Status) => void;
  session: any;
  setSession: (value: any) => void;
  scriptLoadSuccess: boolean;
  scriptLoadError: boolean;
  loginSuccess: (credentials: any) => void;
  loginError: (error?: any) => void;
}

const AuthContext = createContext<authContextInterface>({
  clientId: "",
  status: Status.pending,
  setStatus: () => {},
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
  const [status, setStatus] = useState<Status>(Status.pending);
  const [scriptLoadSuccess, setScriptLoadSuccess] = useState(false);
  const [scriptLoadError, setScriptLoadError] = useState(false);

  //const { promptLogin } = useGoogle(client_id);
  /*************************************
   * Efectos
   ************************************/

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

  const clientId = useMemo(() => {
    return client_id;
  }, [client_id]);

  /*************************************
   * Funciones
   ************************************/

  /**
   * Captura cuando se hace login y guarda las credenciales y actualiza
   * el estado
   * @param {object} credentials | Credenciales de la autentificación
   */
  const loginSuccess = (credentials: any) => {
    setStatus(Status.auth);
    setSession(credentials);
  };

  /**
   * Captura cuando se produce un error al loguearse.
   */
  const loginError = () => {
    setStatus(Status.noAuth);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        clientId,
        status,
        setStatus,
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
