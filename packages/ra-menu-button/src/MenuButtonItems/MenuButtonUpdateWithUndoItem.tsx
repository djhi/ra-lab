import * as React from "react";

import {
  useRefresh,
  useNotify,
  useResourceContext,
  RaRecord,
  useRecordContext,
  useUpdate,
  UpdateParams,
  useTranslate,
} from "ra-core";
import { ListItemIcon, ListItemText, MenuItem, MenuItemProps } from "@mui/material";
import { UseMutationOptions } from "@tanstack/react-query";
import { genericForwardRef } from "../genericForwardRef.js";

const MenuButtonUpdateWithUndoItemComponent = (
  props: MenuButtonUpdateWithUndoItemProps
) => {
  const record = useRecordContext(props);
  const notify = useNotify();
  const resource = useResourceContext(props);
  const refresh = useRefresh();
  const translate = useTranslate();

  const {
    data,
    label = "ra.action.update",
    icon,
    onClick,
    mutationOptions = {},
    ...rest
  } = props;

  const [updateMany, { isPending }] = useUpdate();

  const {
    meta: mutationMeta,
    onSuccess = () => {
      notify(`resources.${resource}.notifications.updated`, {
        type: "info",
        messageArgs: {
          smart_count: 1,
          _: translate("ra.notification.updated", { smart_count: 1 }),
        },
        undoable: true,
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
      refresh();
    },
    ...otherMutationOptions
  } = mutationOptions;

  const handleClick = (e) => {
    if (!record) {
      throw new Error(
        "The UpdateWithUndoButton must be used inside a RecordContext.Provider or must be passed a record prop."
      );
    }
    updateMany(
      resource,
      { id: record.id, data, meta: mutationMeta, previousData: record },
      {
        onSuccess,
        onError,
        mutationMode: "undoable",
        ...otherMutationOptions,
      }
    );
    if (typeof onClick === "function") {
      onClick(e);
    }
    e.stopPropagation();
  };

  return (
    <MenuItem
      onClick={handleClick}
      disabled={isPending}
      {...rest}
    >
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText>{translate(label, { _: label })}</ListItemText>
    </MenuItem>
  );
};

export const MenuButtonUpdateWithUndoItem = genericForwardRef<
  HTMLLIElement,
  MenuButtonUpdateWithUndoItemProps
>(MenuButtonUpdateWithUndoItemComponent);

export interface MenuButtonUpdateWithUndoItemProps<
  RecordType extends RaRecord = any,
  MutationOptionsError = unknown
> extends MenuItemProps {
  icon?: React.ReactNode;
  label?: string;
  data: any;
  mutationOptions?: UseMutationOptions<
    RecordType,
    MutationOptionsError,
    UpdateParams<RecordType>
  > & { meta?: any };
}
