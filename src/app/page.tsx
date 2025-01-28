"use client";

import { Content } from "@/components/content";
import { Header } from "@/components/Header";

export default function Home() {
  return (
  <>
  <div className="w-full justify-center items-center inline-flex flex-col justify-center items-center">
  <Header/>
  <Content/>
  </div>

  </>
  );
}
