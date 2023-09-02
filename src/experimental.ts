import { derive } from "./utils";

export function isFunction<R>(value: (() => R) | R): value is () => R {
  return typeof value === "function";
}

export function strictSwitch<T extends PropertyKey, R>(
  value: T,
  switcher: { [Key in T]: (() => R) | R }
): R {
  const val = switcher[value];
  function isFunction(val: R | (() => R)): val is () => R {
    return typeof val === "function";
  }
  if (isFunction(val)) {
    return val();
  }
  return val as R;
}

export function when<R>(switcher: {
  [Key: string]: () => R | R;
  default: () => R | R;
}): R {
  for (const expression in switcher) {
    if (Boolean(eval(expression))) {
      return switcher[expression]();
    }
  }

  return switcher.default();
}

export function renderSwitch(size: "s" | "m" | "l") {
  const sizeName = strictSwitch(size, {
    s: "small",
    m: () => "medium",
    l: derive(() => "large"),
  });

  return "Your size is " + sizeName;
}

//You must return a value
// @ts-expect-error
const result = derive(() => {});

export function renderWhen(percentage: number) {
  const grade = when({
    [`${percentage} >= 0.9`]: () => {
      return "A";
    },
    [`${percentage} >= 0.9`]: () => {
      return "B";
    },
    [`${percentage} >= 0.7`]: () => {
      return "C";
    },
    [`${percentage} >= 0.6`]: () => {
      return "D";
    },
    default: () => "F",
  });

  return "Your grade is " + grade;
}
