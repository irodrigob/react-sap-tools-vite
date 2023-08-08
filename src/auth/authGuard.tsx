import { ReactNode, FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSession } from "./authProvider";
import { Status } from "auth/types.d";
import useGoogle from "auth/hooks/useGoogle";
import VerifyLogin from "./components/verifyLogin";

/**
 * Verifica a nivel de página/Componente si tiene autorización. En caso
 * contrario va a la pantalla de login
 * @param {object} | Componente hijo
 * @returns | Componente de verificación login, navegación al login
 * o componente pasado por parámetro
 */
interface Props {
  children: ReactNode;
}

export const AuthGuard: FC<Props> = (props: Props) => {
  const { children } = props;
  const { status } = useSession();
  let location = useLocation();
  const {} = useGoogle();

  if (status === Status.loading) return <VerifyLogin />;
  else if (status == Status.noAuth)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};
