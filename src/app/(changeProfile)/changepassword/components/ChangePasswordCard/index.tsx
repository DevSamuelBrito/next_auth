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
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react"

export function ChangePasswordCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.error || "Erro ao criar usuário")
      return;
    }

    alert("Usuário criado com sucesso!");
    redirect("/");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <ArrowLeft size={20} className="mb-2"  onClick={()=>redirect("/dashboard/profile")} cursor="pointer"/>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para alterar sua senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Senha Atual:</Label>
                <Input
                  id="name"
                  type="password"
                  value={name}
                  placeholder="********"

                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Nova Senha:</Label>
                <Input
                  id="email"
                  type="password"
                  placeholder="********"

                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirmar Nova Senha:</Label>
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
                  Alterar Senha
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
