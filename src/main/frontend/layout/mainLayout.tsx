import { FC } from "react";
import { Outlet } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import AppToolbarContainer from "./appToolbar/appToolbarContainer";

const MainLayout: FC = () => {
  return (
    <>
      <AppToolbarContainer />
      <Toolbar />
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
