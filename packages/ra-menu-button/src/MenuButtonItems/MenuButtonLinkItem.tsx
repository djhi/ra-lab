import * as React from "react";
import { useTranslate } from "ra-core";
import { MenuItem, MenuItemProps } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";
import { useMenuButton } from "../useMenuButton.js";

export const MenuButtonLinkItem = React.forwardRef<
  HTMLAnchorElement,
  MenuItemProps &
    LinkProps & {
      label: string;
    }
>(({ label, ...props }, ref) => {
  const translate = useTranslate();
  const { closeMenu } = useMenuButton();
  return (
    <MenuItem ref={ref} component={Link} onClick={closeMenu} {...props}>
      {translate(label, { _: label })}
    </MenuItem>
  );
});
