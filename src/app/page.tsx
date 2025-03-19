
"use client";

import { signIn } from "next-auth/react";

//temos que usar o cliente para que para a função de SignIn no futuro

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <button className="bg-blue-200 rounded-2xl px-2 py-2 border-2 font-bold"
        onClick={() => signIn('github', {callbackUrl: "/dashboard"})}
      >Login com Github</button>
    </main>
  );
}
