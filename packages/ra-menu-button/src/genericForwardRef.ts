import { forwardRef } from "react";

export function genericForwardRef<T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
): (props: P & React.RefAttributes<T>) => React.ReactNode | null {
    // @ts-ignore
    return forwardRef(render);
}
