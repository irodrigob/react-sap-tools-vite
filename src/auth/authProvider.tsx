import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { loadGSIScript } from "./hooks/useScript";
import { Status } from "./types.d";
import { GOOGLE_URL_SCRIPT } from "./constants";
import useGoogle from "auth/hooks/useGoogle";
import jwtDecode from "jwt-decode";

interface authContextInterface {
  clientId: string;
  status: Status;
  setStatus: (value: Status) => void;
  session: any;
  setSession: (value: any) => void;
  loginSuccess: (credentials: any) => void;
  loginError: (error?: any) => void;
}

const AuthContext = createContext<authContextInterface>({
  clientId: "",
  status: Status.pending,
  setStatus: () => { },
  session: "",
  setSession: () => { },
  loginSuccess: () => { },
  loginError: () => { },
});

interface Props {
  client_id: string;
  children?: ReactNode;
}

export const AuthProvider: FC<Props> = (props: Props) => {
  const { client_id, children } = props;
  const [session, setSession] = useState<any>();
  const [status, setStatus] = useState<Status>(Status.pending);
  const { googleInitialize } = useGoogle()


  /*************************************
   * Efectos
   ************************************/

  useEffect(() => {
    loadGSIScript(
      () => {
        // El status se cambia a no
        setStatus(Status.loading);
        googleInitialize(client_id, callbackGoogleInit)
      },
      (error: any) => {
        loginError(error)
      }
    );

    return () => {
      const scriptTag = document.querySelector(
        `script[src="${GOOGLE_URL_SCRIPT}"]`
      );
      if (scriptTag) document.body.removeChild(scriptTag);
    };
  }, [client_id]);

  const clientId = useMemo(() => {
    return client_id;
  }, [client_id]);

  /*************************************
   * Funciones
   ************************************/

  const callbackGoogleInit = useCallback((response: any) => {
    if (response.credential) loginSuccess(jwtDecode(response.credential));
    else loginError(response);

  }, [])

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
  const loginError = (error: any) => {
    setStatus(Status.noAuth);
    setSession(null);

    console.log("ERROR AUTH CONNECT----->")
    console.log(error)
    console.log("<-------ERROR AUTH CONNECT")
  };

  return (
    <AuthContext.Provider
      value={{
        clientId,
        status,
        setStatus,
        session,
        setSession,
        loginSuccess,
        loginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useSession = () => useContext(AuthContext);
