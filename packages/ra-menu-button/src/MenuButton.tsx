import * as React from "react";
import { LinkToType, useEvent } from "ra-core";
import { Box, Menu } from "@mui/material";
import { MenuButtonProvider } from "./MenuButtonProvider.js";
import { MenuButtonIconButton } from "./MenuButtonItems/MenuButtonIconButton.js";
import { MenuButtonLinkItem } from "./MenuButtonItems/MenuButtonLinkItem.js";
import { MenuButtonRecordLinkItem } from "./MenuButtonItems/MenuButtonRecordLinkItem.js";
import { MenuButtonUpdateItem } from "./MenuButtonItems/MenuButtonUpdateItem.js";
import { MenuButtonDeleteItem } from "./MenuButtonItems/MenuButtonDeleteItem.js";

export const MenuButton = (props: MenuButtonProps) => {
  const { children, button = DefaultButton } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleClick = useEvent((target: HTMLElement) => setAnchorEl(target));
  const handleClose = useEvent((event?: {}) => {
    // Avoid propagation of the event to the datagrid rowClick
    if (event) {
      (event as Event).stopPropagation();
    }
    setAnchorEl(null);
  });

  return (
    <Box>
      <MenuButtonProvider
        value={{ closeMenu: handleClose, openMenu: handleClick }}
      >
        {button}
        <Menu
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={(event) => handleClose(event)}
        >
          {children}
        </Menu>
      </MenuButtonProvider>
    </Box>
  );
};

export interface MenuButtonProps {
  children?: React.ReactNode;
  button?: React.ReactNode;
}

MenuButton.IconButton = MenuButtonIconButton;
MenuButton.LinkItem = MenuButtonLinkItem;
MenuButton.RecordLinkItem = MenuButtonRecordLinkItem;
MenuButton.UpdateItem = MenuButtonUpdateItem;
MenuButton.DeleteItem = MenuButtonDeleteItem;

const DefaultButton = <MenuButton.IconButton />;
