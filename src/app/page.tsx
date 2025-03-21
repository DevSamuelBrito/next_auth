"use client";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { LoginForm } from "@/components/login-form";

export default function Home() {
  return <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm">
      <LoginForm  />
    </div>
  </div>;
}

// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   const result = await signIn("credentials", {
//     email,
//     password,
//     redirect: false,  // Impede o redirecionamento automático
//   });

//   if (result?.error) {
//     console.log(result.error);
//     alert("Credenciais inválidas");
//   } else {
//     alert("Logado com sucesso");
//     redirect("/dashboard");
//   }
// };

// return (
//   <main className="flex justify-center items-center h-screen flex-col">
//     <form onSubmit={handleSubmit}>
//       <label>Email</label>
//       <input
//         className="rounded-md gap-2 text-bold border-2"
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <label>Senha</label>
//       <input
//         className="rounded-md gap-2 text-bold border-2"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit" className="bg-amber-800 px-2 py-2">Enviar</button>
//     </form>
//   </main>
//);