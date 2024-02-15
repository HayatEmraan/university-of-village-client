/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface IAdmin {
  index?: boolean;
  name: string;
  path?: string;
  element?: ReactNode;
  children?: IAdmin[];
}

export type IAdminRoute =
  | {
      key: string;
      label: any;
      children?: IAdminRoute[];
    }
  | undefined;
