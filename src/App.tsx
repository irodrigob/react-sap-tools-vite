import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslations } from "./translations/i18nContext";
import { AuthGuard } from "./auth/authGuard";
import MainLayout from "main/frontend/layout/mainLayout";
import Main from "main/frontend/main/main";
import Login from "auth/components/login";
const LazyMainTransportOrder = lazy(
  () =>
    import(
      "sap/transportOrder/infraestructure/frontend/components/userOrders/mainTransportOrder"
    )
);
const LazyMainTranslate = lazy(() => import("sap/translate/infraestructure/frontend/components/mainTranslate"));
const LazyMainAdt = lazy(() => import("sap/adt/infraestructure/frontend/components/mainAdt"));

function App() {
  const { getI18nText } = useTranslations();

  useEffect(() => {
    document.title = getI18nText("app.title");
  }, []);

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <AuthGuard>
                <Main />
              </AuthGuard>
            }
          />
          <Route
            path="/transportOrder"
            element={
              <AuthGuard>
                <LazyMainTransportOrder />
              </AuthGuard>
            }
          />
          <Route
            path="/translate"
            element={
              <AuthGuard>
                <LazyMainTranslate />
              </AuthGuard>
            }
          />
          <Route
            path="/adt"
            element={
              <AuthGuard>
                <LazyMainAdt />
              </AuthGuard>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
}

export default App;
