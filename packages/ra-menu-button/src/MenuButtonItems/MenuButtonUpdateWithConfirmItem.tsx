import * as React from "react";
import {
  useTranslate,
  useNotify,
  useResourceContext,
  MutationMode,
  RaRecord,
  useRecordContext,
  useUpdate,
  UpdateParams,
} from "ra-core";
import { UseMutationOptions } from "@tanstack/react-query";
import { humanize, inflect } from "inflection";
import { ListItemIcon, ListItemText, MenuItem, MenuItemProps } from "@mui/material";
import { Confirm } from "ra-ui-materialui";
import { genericForwardRef } from "../genericForwardRef.js";

export const MenuButtonUpdateWithConfirmItemComponent = (
  props: MenuButtonUpdateWithConfirmItemProps
) => {
  const notify = useNotify();
  const translate = useTranslate();
  const resource = useResourceContext(props);
  const [isOpen, setOpen] = React.useState(false);
  const record = useRecordContext(props);

  const {
    confirmTitle = "ra.message.bulk_update_title",
    confirmContent = "ra.message.bulk_update_content",
    data,
    icon,
    label = "ra.action.update",
    mutationMode = "pessimistic",
    onClick,
    mutationOptions = {},
    ...rest
  } = props;
  const {
    meta: mutationMeta,
    onSuccess = () => {
      notify(`resources.${resource}.notifications.updated`, {
        type: "info",
        messageArgs: {
          smart_count: 1,
          _: translate("ra.notification.updated", { smart_count: 1 }),
        },
        undoable: mutationMode === "undoable",
      });
    },
    onError = (error: Error | string) => {
      notify(
        typeof error === "string"
          ? error
          : error.message || "ra.notification.http_error",
        {
          type: "error",
          messageArgs: {
            _:
              typeof error === "string"
                ? error
                : error && error.message
                ? error.message
                : undefined,
          },
        }
      );
    },
    onSettled = () => {
      setOpen(false);
    },
    ...otherMutationOptions
  } = mutationOptions;

  const [update, { isPending }] = useUpdate(
    resource,
    { id: record?.id, data, meta: mutationMeta, previousData: record },
    {
      onSuccess,
      onError,
      onSettled,
      mutationMode,
      ...otherMutationOptions,
    }
  );

  const handleClick = (e) => {
    setOpen(true);
    e.stopPropagation();
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleUpdate = (e) => {
    update(resource, {
      id: record?.id,
      data,
      meta: mutationMeta,
      previousData: record,
    });

    if (typeof onClick === "function") {
      onClick(e);
    }
  };

  return (
    <>
      <MenuItem onClick={handleClick}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText>{translate(label, { _: label })}</ListItemText>
      </MenuItem>
      <Confirm
        isOpen={isOpen}
        loading={isPending}
        title={confirmTitle}
        content={confirmContent}
        translateOptions={{
          smart_count: 1,
          name: translate(`resources.${resource}.forcedCaseName`, {
            smart_count: 1,
            _: humanize(
              translate(`resources.${resource}.name`, {
                smart_count: 1,
                _: resource ? inflect(resource, 1) : undefined,
              }),
              true
            ),
          }),
        }}
        onConfirm={handleUpdate}
        onClose={handleDialogClose}
      />
    </>
  );
};

export const MenuButtonUpdateWithConfirmItem = genericForwardRef<
  HTMLLIElement,
  MenuButtonUpdateWithConfirmItemProps
>(MenuButtonUpdateWithConfirmItemComponent);

export interface MenuButtonUpdateWithConfirmItemProps<
  RecordType extends RaRecord = any,
  MutationOptionsError = unknown
> extends MenuItemProps {
  confirmContent?: React.ReactNode;
  confirmTitle?: React.ReactNode;
  icon?: React.ReactNode;
  data: any;
  label?: string;
  mutationMode?: MutationMode;
  mutationOptions?: UseMutationOptions<
    RecordType,
    MutationOptionsError,
    UpdateParams<RecordType>
  > & { meta?: any };
}
