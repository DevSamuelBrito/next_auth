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
import { toast } from "sonner"

export function ChangePasswordCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [currentPassword, setCurrentPassword] = useState("") //senha atual
  const [newPassword, setNewPassword] = useState(""); // nova senha
  const [confirmPassword, setConfirmPassword] = useState(""); // confirmar nova senhaF

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Novas Senhas não coincidem");
      return;
    }

    const res = await fetch("/api/change-password", {
      method: "POST",
      body: JSON.stringify({
        currentPassword,
        newPassword,
      })
    });


    if (!res.ok) {
      toast.error("Erro ao alterar senha");
      return;
    }

    toast.success("Senha alterada com sucesso");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    redirect("/dashboard/profile");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <ArrowLeft size={20} className="mb-2" onClick={() => redirect("/dashboard/profile")} cursor="pointer" />
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
                  value={currentPassword}
                  placeholder="********"
                  required
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Nova Senha:</Label>
                <Input
                  id="email"
                  type="password"
                  placeholder="********"

                  value={newPassword}
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirmar Nova Senha:</Label>
                </div>
                <Input
                  id="password"
                  value={confirmPassword}
                  type="password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
