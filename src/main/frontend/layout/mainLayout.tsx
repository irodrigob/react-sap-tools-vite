import { FC } from "react";
import { Outlet } from "react-router-dom";
import AppToolbarContainer from "./appToolbar/appToolbarContainer";

const MainLayout: FC = () => {
  return (
    <>
      <AppToolbarContainer />
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
