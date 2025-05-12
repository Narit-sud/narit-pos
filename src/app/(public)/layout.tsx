"use client";
import { ReactNode } from "react";
import HomeBar from "@/components/HomeBar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HomeBar />
      {children}
    </>
  );
}
