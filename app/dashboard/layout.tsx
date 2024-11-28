import { DashboardLayout } from "@/components/dashboard/layout";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="top-center" />
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
}