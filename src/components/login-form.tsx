import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
//autenticação
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link"
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner"



export  function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      toast.error("Credenciais inválidas")
    } else {
      toast.success("Logado com sucesso")
      router.push("/dashboard");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Entre com sua Conta</CardTitle>
          <CardDescription>
            Entre com o seu email e senha para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="email@email.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    href="/forget-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueci minha senha
                  </Link>
                </div>
                <Input
                  id="password"
                  value={password}
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>

              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Não tem um conta?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Criar uma conta
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
