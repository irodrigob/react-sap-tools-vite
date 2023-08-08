import { useEffect } from "react";
import { useTranslations } from "translations/i18nContext";

export default function Main() {
  const { getI18nText } = useTranslations();

  useEffect(() => {
    document.title = getI18nText("app.title");
  }, []);

  return <p>Main</p>;
}
