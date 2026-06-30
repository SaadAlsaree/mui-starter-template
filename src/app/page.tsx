import { Metadata } from "next";
import DashboardShell from "./DashboardShell";

export const metadata: Metadata = {
  title: "Dashboard - Sitemark",
};

export default function Page() {
  return <DashboardShell />;
}
