import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useSession } from "auth/authProvider";

/**
 * Botón de login estándar de google
 * @param {object} pButtonRef | Referencia a la etiquete donde se pintar el bottón
 */
export function GoogleButtonLogin() {
  const navigate = useNavigate();
  const { clientId, loginSuccess } = useSession();
  const buttonRef = useRef<HTMLDivElement>(null);
  //const from = location.state?.from?.pathname || "/";

  const handlerLogin = useCallback((response: any) => {
    loginSuccess(jwtDecode<JwtPayload>(response.credential));

    // De momento vamos al ráiz de la página
    navigate("/", { replace: true });
  }, []);

  /**
   * El auto_select a true es para que se autologuea con la última cuenta utilizada.
   * Esto se hace para cuando alguiente tiene más de una cuenta en chrome no tenga que
   * seleccionar la cuenta una y otra vez.
   */
  useEffect(() => {

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handlerLogin,
      auto_select: true,
    });

    window.google.accounts.id.renderButton(buttonRef.current!, {
      type: "standard",
      theme: "outline",
      size: "large",
    });

  }, []);

  return <div ref={buttonRef} />;
}
