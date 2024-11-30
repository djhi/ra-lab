import * as React from "react";
import { MenuButtonContext } from "./MenuButtonContext.js";

export const useMenuButton = () => {
  const context = React.useContext(MenuButtonContext);
  if (!context) {
    throw new Error("useMenuButton must be used within a MenuButtonProvider");
  }
  return context;
};
