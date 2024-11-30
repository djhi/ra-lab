import * as React from "react";
import { useMenuButton } from "../useMenuButton.js";
import {
  MenuButtonDeleteWithConfirmItem,
  MenuButtonDeleteWithConfirmItemProps,
} from "./MenuButtonDeleteWithConfirmItem.js";
import { MenuButtonDeleteWithUndoItem } from "./MenuButtonDeleteWithUndoItem.js";

export const MenuButtonDeleteItem = React.forwardRef<
  HTMLLIElement,
  MenuButtonDeleteWithConfirmItemProps
>(({ mutationMode = "undoable", ...props }, ref) => {
  const { closeMenu } = useMenuButton();

  if (mutationMode === "undoable") {
    return (
      <MenuButtonDeleteWithUndoItem {...props} ref={ref} onClick={closeMenu} />
    );
  }
  return (
    <MenuButtonDeleteWithConfirmItem
      {...props}
      ref={ref}
      onClick={closeMenu}
      mutationMode={mutationMode}
    />
  );
});
