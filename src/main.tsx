import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Librerias para que junto al tema puesto en el index.html funcione el dark mode
//import "@ui5/webcomponents-theming/dist/Assets.js";
//import "@ui5/webcomponents/dist/generated/json-imports/Themes";
//import "@ui5/webcomponents-fiori/dist/generated/json-imports/Themes";
// Esto hará muchas cosas pero una de ellas es cargar textos en los idiomas en los componentes. Si no
// Se carga al inicio salen en ingles.
import "@ui5/webcomponents-react/dist/Assets";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "translations/i18n";
import theme from "theme";

import I18nProvider from "./translations/i18nContext";

//import I18nProvider from "./translations/i18nContext";
import { AuthProvider } from "./auth/authProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <AuthProvider client_id={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </I18nProvider>
  </React.StrictMode>
);
