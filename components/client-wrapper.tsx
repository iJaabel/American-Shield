"use client";

import { ScrollToTop } from "@/components/scroll-to-top";
import { ScrollProgress } from "@/components/scroll-progress";
import { Toaster } from "sonner";

export function ClientWrapper() {
  return (
    <>
      <Toaster position="top-center" />
      <ScrollProgress />
      <ScrollToTop />
    </>
  );
}