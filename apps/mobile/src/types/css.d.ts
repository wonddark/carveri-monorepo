/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as React from "react";

declare module "react" {
  interface CSSProperties {
    [varName: `--${string}`]: string | number | undefined;
  }
}
