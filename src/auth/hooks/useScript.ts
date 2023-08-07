import { GOOGLE_URL_SCRIPT } from "auth/constants";

/**
 * Función que adjunta un script al documento. Lo hace a través de un promise para saber cuando
 * ha terminado de carga el documento.
 * @param {string} src | Ruta del Script
 * @returns | Promise que el proceso de carga del script
 */
export const loadScript = (src: string): Promise<undefined> =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`))
      return resolve(undefined);
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(undefined);
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });

/**
 * Función que carga el script GSI para las autentificación de google
 * @param {function} fResolveCallBack | Función que se ejecuta cuando el script ha sido cargado
 * @param {function} fErrorCallBack | Función que se ejecuta cuando  el script se carga con error
 */
export const loadGSIScript = (
  fResolveCallBack: () => void,
  fErrorCallBack: () => void
) => {
  loadScript(GOOGLE_URL_SCRIPT)
    .then(() => {
      fResolveCallBack();
    })
    .catch((error) => {
      console.log(error);
      fErrorCallBack();
    });
};
