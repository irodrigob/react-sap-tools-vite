import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSystemData } from "systems/infraestructure/context/systemContext";
export default function useSelectApp() {
  const { setExpandSidebar, setShowSidebar } = useSystemData();
  const navigate = useNavigate();

  const appSelected = useCallback((frontendPage: string) => {
    setExpandSidebar(true);
    setShowSidebar(true);
    navigate(frontendPage);
  }, []);

  return { appSelected };
}
