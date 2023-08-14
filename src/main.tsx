import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { initializeApollo } from "shared/graphql/client";
// Librerias para que junto al tema puesto en el index.html funcione el dark mode
//import "@ui5/webcomponents-theming/dist/Assets.js";
//import "@ui5/webcomponents/dist/generated/json-imports/Themes";
//import "@ui5/webcomponents-fiori/dist/generated/json-imports/Themes";
// Esto hará muchas cosas pero una de ellas es cargar textos en los idiomas en los componentes. Si no
// Se carga al inicio salen en ingles.
import "@ui5/webcomponents-react/dist/Assets";
import { ThemeProvider as ThemeProviderMaterial } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from "@ui5/webcomponents-react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "translations/i18n";
import theme from "theme";
import { store } from "shared/storage/storageConfiguration";
import I18nProvider from "./translations/i18nContext";
import App from "./App.tsx";
import GlobalProvider from "shared/context/globalDataContext";
import SystemProvider from "systems/infraestructure/context/systemContext";
import { AuthProvider } from "./auth/authProvider";


const apolloClient = initializeApollo();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <AuthProvider client_id={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GlobalProvider>
              <SystemProvider>
                <BrowserRouter>
                  <ThemeProviderMaterial theme={theme}>
                    <ThemeProvider>
                      <CssBaseline />
                      <App />
                      <ToastContainer />
                    </ThemeProvider>
                  </ThemeProviderMaterial>
                </BrowserRouter>
              </SystemProvider>
            </GlobalProvider>
          </AuthProvider>
        </ApolloProvider>
      </Provider>
    </I18nProvider>
  </React.StrictMode>
);
