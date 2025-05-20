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
import Link from "next/link"
import { toast } from "sonner"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password, username })
    })

    const data = await response.json()

    if (!response.ok) {
      toast.error(data.error || "Erro ao criar usuário")
      return;
    }

    alert("Usuário criado com sucesso!");
    redirect("/");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign Up to your account</CardTitle>
          <CardDescription>
            Enter your email below to sign up to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  placeholder="Nome"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  placeholder="Username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p className="text-sm italic text-center">O Username tem que ser unico.</p>
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
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
                  Sign Up
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
