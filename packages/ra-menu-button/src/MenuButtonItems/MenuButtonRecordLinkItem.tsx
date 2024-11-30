import * as React from "react";
import { LinkToType, useGetPathForRecord, useRecordContext, useResourceContext, useTranslate } from "ra-core";
import { MenuItem, MenuItemProps } from "@mui/material";
import { LinkProps } from "react-router-dom";
import { MenuButtonLinkItem } from "./MenuButtonLinkItem.js";

export const MenuButtonRecordLinkItem = React.forwardRef<
  HTMLAnchorElement | HTMLLIElement,
  MenuItemProps &
    Omit<LinkProps, "to"> & {
      label: string;
      link: LinkToType;
    }
>(({ label, link, ...props }, ref) => {
  const record = useRecordContext();
  const resource = useResourceContext();
  const path = useGetPathForRecord({
    record,
    resource,
    link,
  });
  const translate = useTranslate();

  if (!path) {
    return (
      // @ts-ignore
      <MenuItem ref={ref} disabled {...props}>
        {translate(label, { _: label })}
      </MenuItem>
    );
  }
  // @ts-ignore
  return <MenuButtonLinkItem ref={ref} to={path} label={label} {...props} />;
});
