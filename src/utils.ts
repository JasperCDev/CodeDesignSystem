import { NotUndefined } from "./ts-utils";

export function derive<T>(cb: () => NotUndefined<T>) {
  return cb();
}
