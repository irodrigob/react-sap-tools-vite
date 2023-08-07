import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { useSession } from "auth/authProvider";
import { Status } from "auth/types.d";

export default function useGoogle() {
  const {
    clientId,
    scriptLoadSuccess,
    scriptLoadError,
    status,
    setStatus,
    loginError,
    loginSuccess,
  } = useSession();

  /**
   * Efecto que se lanzará cuando cambie el ID de google, que esto solo ocurre la primera vez
   * en la aplicación y lo que hará es mirar el usuario que esta logeado por defecto en la aplicación.
   * Si esta logiegado se guardará los datos de la sesión.
   * El status general irá cambiando según el proceso. Al inicio se estará y cuando finalice, bien o mal, entonces
   * se pondrá a false.
   */
  useEffect(() => {
    // El efecto solo se lanza cuando el status no es ni autorizado ni no autorizado. Ya que es cuando no se ha verificado el login todavía, ni se ha hecho
    // login desde el botón de acceso de google.
    if (status == Status.pending) {
      // Aunque el script del GSI no esta cargado pongo el loading porque también forma parte del proceso
      // de verificación.
      setStatus(Status.loading);

      // Hay que esperar a que el script este totalmente cargado.
      if (scriptLoadSuccess) {
        window.google?.accounts.oauth2
          .initTokenClient({
            client_id: clientId,
            scope: "openid profile email",
            prompt: "select_account",
            callback: async (response: any) => {
              if (response.access_token) {
                const userInfo = await axios
                  .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                      Authorization: `Bearer ${response.access_token}`,
                    },
                  })
                  .then((res) => res.data)
                  .catch((error) => {
                    loginError(error);
                  });
                loginSuccess(userInfo);
              } else {
                loginError();
              }
            },
          })
          .requestAccessToken();
      } else if (scriptLoadError) {
        loginError(scriptLoadError);
      }
    }
  }, [
    clientId,
    scriptLoadSuccess,
    scriptLoadError,
    loginError,
    loginSuccess,
    status,
    setStatus,
  ]);

  /**
   * Función que muestra el login para cambiar el usuario.
   */
  const promptLogin = useCallback(() => {
    if (scriptLoadSuccess) {
      window.google?.accounts.oauth2
        .initTokenClient({
          client_id: clientId,
          scope: "openid profile email",
          callback: async (response: any) => {
            if (response.access_token) {
              const userInfo = await axios
                .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                  headers: {
                    Authorization: `Bearer ${response.access_token}`,
                  },
                })
                .then((res) => res.data)
                .catch((error) => {
                  loginError(error);
                });
              loginSuccess(userInfo);
            } else {
              loginError();
            }
          },
        })
        .requestAccessToken();
    }
  }, []);

  return { promptLogin };
}
