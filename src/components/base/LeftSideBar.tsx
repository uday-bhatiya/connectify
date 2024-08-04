"use client";
import React from "react";
import Image from "next/image";
import SideBarLinks from "../SideBarLinks";

export default function LeftSidebar() {
  return (
    <div className="h-screen border-r-2 md:w-1/4 lg:p-10 md:pt-5  hidden md:block">
      <div className="flex justify-start items-center">
        <Image src="" width={50} height={50} alt="logo" />
        <h1 className="font-bold text-xl ml-2">Connectify</h1>
      </div>
      <SideBarLinks />
    </div>
  );
}
