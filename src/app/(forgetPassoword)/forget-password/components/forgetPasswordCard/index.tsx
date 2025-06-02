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
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner";

export function ForgetPasswordCard({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/forget-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        })


        toast.success("Se o email existir, um link de recuperação será enviado para o seu email. Verifique sua caixa de entrada ou spam.");


        setTimeout(() => {
            redirect("/");
        }, 3000)
        setEmail("");
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <ArrowLeft size={20} className="mb-2" onClick={() => redirect("/")} cursor="pointer" />
                    <CardTitle>Verificar Email</CardTitle>
                    <CardDescription>
                        Digite o seu email abaixo para recuperar a sua conta. Caso ela exista, um email de verificação será enviado para o seu email.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    placeholder="Digite o seu Email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Verificar Email
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
