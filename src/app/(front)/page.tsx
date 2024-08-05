"use client"

import AddPost from "@/components/posts/AddPost";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session, status } = useSession()
  console.log(session)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-2">
      <AddPost/>
      <h1 className="text-5xl text-white">{session?.user?.name}hello </h1>
    </main>
  );
}
