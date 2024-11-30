import * as React from "react";
import {
  RaRecord,
  useDeleteWithConfirmController,
  useRecordContext,
  useResourceContext,
  useTranslate,
  //   UseDeleteWithConfirmControllerParams,
} from "ra-core";
import { Confirm } from "ra-ui-materialui";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuItemProps,
} from "@mui/material";
import clsx from "clsx";
import { humanize, singularize } from "inflection";
import { UseDeleteWithConfirmControllerParams } from "ra-core/dist/cjs/controller/button/useDeleteWithConfirmController.js";
import { genericForwardRef } from "../genericForwardRef.js";

const MenuButtonDeleteWithConfirmItemComponent = <
  RecordType extends RaRecord = any
>(
  props: MenuButtonDeleteWithConfirmItemProps<RecordType>,
  ref
) => {
  const {
    className,
    confirmTitle = "ra.message.delete_title",
    confirmContent = "ra.message.delete_content",
    confirmColor = "primary",
    icon,
    label = "ra.action.delete",
    mutationMode = "pessimistic",
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

  const { open, isPending, handleDialogOpen, handleDialogClose, handleDelete } =
    useDeleteWithConfirmController({
      record,
      redirect,
      mutationMode,
      onClick,
      mutationOptions,
      resource,
      successMessage,
    });

  return (
    <>
      <MenuItem
        onClick={handleDialogOpen}
        className={clsx("ra-delete-button", className)}
        key="button"
        color={color}
        {...rest}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText>{translate(label, { _: label })}</ListItemText>
      </MenuItem>
      <Confirm
        isOpen={open}
        loading={isPending}
        title={confirmTitle}
        content={confirmContent}
        confirmColor={confirmColor}
        translateOptions={{
          name: translate(`resources.${resource}.forcedCaseName`, {
            smart_count: 1,
            _: humanize(
              translate(`resources.${resource}.name`, {
                smart_count: 1,
                _: resource ? singularize(resource) : undefined,
              }),
              true
            ),
          }),
          id: record?.id,
        }}
        onConfirm={handleDelete}
        onClose={handleDialogClose}
      />
    </>
  );
};

export const MenuButtonDeleteWithConfirmItem = genericForwardRef<
  HTMLLIElement,
  MenuButtonDeleteWithConfirmItemProps
>(MenuButtonDeleteWithConfirmItemComponent);

export interface MenuButtonDeleteWithConfirmItemProps<
  RecordType extends RaRecord = any,
  MutationOptionsError = unknown
> extends Omit<MenuItemProps, "onClick">,
    UseDeleteWithConfirmControllerParams {
  confirmTitle?: React.ReactNode;
  confirmContent?: React.ReactNode;
  confirmColor?: "primary" | "warning";
  icon?: React.ReactNode;
  label?: string;
}
