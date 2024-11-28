"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ViewSelectorProps {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}

export function ViewSelector({ view, onChange }: ViewSelectorProps) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium">
        Server Location
      </label>
      <Tabs value={view} onValueChange={(value) => onChange(value as "grid" | "list")}>
        <TabsList className="grid w-[200px] grid-cols-2">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}