import React from "react";

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}
