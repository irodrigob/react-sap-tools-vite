import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslations } from "./translations/i18nContext";
import { AuthGuard } from "./auth/authGuard";
import MainLayout from "main/frontend/layout/mainLayout";
import Main from "main/frontend/main/main";
import Login from "auth/components/login";

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
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
}

export default App;
