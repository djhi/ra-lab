import * as React from "react";
import {
  IconButtonWithTooltip,
  IconButtonWithTooltipProps,
} from "ra-ui-materialui";
import MoreIcon from "@mui/icons-material/MoreVert.js";
import { useMenuButton } from "../useMenuButton.js";

// @ts-ignore
const DefaultIcon = <MoreIcon />;

export const MenuButtonIconButton = ({
  children = DefaultIcon,
  label = "ra.action.more",
  ...props
}: MenuButtonIconButtonProps) => {
  const { openMenu } = useMenuButton();

  return (
    <IconButtonWithTooltip
      onClick={(event) => {
        event.stopPropagation();
        openMenu(event.currentTarget);
      }}
      label={label}
      {...props}
    >
      {children}
    </IconButtonWithTooltip>
  );
};

export interface MenuButtonIconButtonProps
  extends Partial<Omit<IconButtonWithTooltipProps, "onClick">> {}
