"use client"

import { Header } from "@/components/custom/header";
import { ViewerLayout } from "@/components/layouts/tabs.layout";

export default function Home() {
  return (
    <div className="h-svh w-full">
      <Header />
      <ViewerLayout />
    </div>
  );
}
