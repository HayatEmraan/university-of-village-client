import { MenuProps } from "antd";

export const statusOptions = [
  { value: "ONGOING", label: "ONGOING" },
  { value: "UPCOMING", label: "UPCOMING" },
  { value: "COMPLETED", label: "COMPLETED" },
];

export const items: MenuProps["items"] = [
  {
    label: "ONGOING",
    key: "ONGOING",
  },
  {
    label: "UPCOMING",
    key: "UPCOMING",
  },
  {
    label: "COMPLETED",
    key: "COMPLETED",
  },
];
