import * as React from "react";
import { useMenuButton } from "../useMenuButton.js";
import {
  MenuButtonUpdateWithConfirmItem,
  MenuButtonUpdateWithConfirmItemProps,
} from "./MenuButtonUpdateWithConfirmItem.js";
import { MenuButtonUpdateWithUndoItem } from "./MenuButtonUpdateWithUndoItem.js";

export const MenuButtonUpdateItem = React.forwardRef<
  HTMLLIElement,
  MenuButtonUpdateWithConfirmItemProps
>(({ mutationMode = 'undoable', ...props}, ref) => {
  const { closeMenu } = useMenuButton();
  if (mutationMode === "undoable") {
    return (
      <MenuButtonUpdateWithUndoItem {...props} ref={ref} onClick={closeMenu} />
    );
  }
  return (
    <MenuButtonUpdateWithConfirmItem
      {...props}
      ref={ref}
      onClick={closeMenu}
      mutationMode={mutationMode}
    />
  );
});
