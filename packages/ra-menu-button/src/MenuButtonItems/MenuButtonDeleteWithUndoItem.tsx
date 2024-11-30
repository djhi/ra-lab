import * as React from "react";
import {
  RaRecord,
  useDeleteWithUndoController,
  useRecordContext,
  useResourceContext,
  useTranslate,
//   UseDeleteWithUndoControllerParams,
} from "ra-core";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuItemProps,
} from "@mui/material";
import clsx from "clsx";
import { UseDeleteWithUndoControllerParams } from "ra-core/dist/cjs/controller/button/useDeleteWithUndoController.js";
import { genericForwardRef } from "../genericForwardRef.js";

export const MenuButtonDeleteWithUndoItemComponent = <
  RecordType extends RaRecord = any
>(
  props: MenuButtonDeleteWithUndoItemProps<RecordType>
) => {
  const {
    label = "ra.action.delete",
    className,
    icon,
    onClick,
    redirect = "list",
    mutationOptions,
    color = "error",
    successMessage,
    ...rest
  } = props;

  const translate = useTranslate();
  const record = useRecordContext(props);
  const resource = useResourceContext(props);
  const { isPending, handleDelete } = useDeleteWithUndoController({
    record,
    resource,
    redirect,
    onClick,
    mutationOptions,
    successMessage,
  });

  return (
    <MenuItem
      onClick={handleDelete}
      disabled={isPending}
      className={clsx("ra-delete-button", className)}
      key="button"
      color={color}
      {...rest}
    >
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText>{translate(label, { _: label })}</ListItemText>
    </MenuItem>
  );
};


export const MenuButtonDeleteWithUndoItem = genericForwardRef<
  HTMLLIElement,
  MenuButtonDeleteWithUndoItemProps
>(MenuButtonDeleteWithUndoItemComponent);

export interface MenuButtonDeleteWithUndoItemProps<
  RecordType extends RaRecord = any,
  MutationOptionsError = unknown
> extends Omit<MenuItemProps, "onClick">,
    UseDeleteWithUndoControllerParams {
  icon?: React.ReactNode;
  label?: string;
}
