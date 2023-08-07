import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslations } from "./translations/i18nContext";
import { AuthGuard } from "./auth/authGuard";
import Demo from "./components/demo";

function App() {
  const { getI18nText } = useTranslations();

  useEffect(() => {
    document.title = getI18nText("app.title");
  }, []);

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <Demo />
            </AuthGuard>
          }
        ></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
