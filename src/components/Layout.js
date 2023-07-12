import { Outlet } from "react-router-dom";
import { LayoutContainer } from "../config/theme/styles";

import React from "react";

function Layout() {
  return (
    <LayoutContainer>
      <Outlet />
    </LayoutContainer>
  );
}

export default Layout;
