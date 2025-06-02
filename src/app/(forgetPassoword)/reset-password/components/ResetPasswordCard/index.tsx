import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner";


interface ResetPasswordCardProps {
    token: string;
}

type Props = ResetPasswordCardProps & React.ComponentProps<"div">;

export function ResetPasswordCard({ className, token, ...props }: Props) {

    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, password })
        })

        const data = await res.json();
        if (!res.ok) {
            toast.error(data.message || "Erro ao alterar a senha");
            return;
        }

        toast.success(data.message);

        setTimeout(() => {
            redirect("/");
        }, 3000)
        setPassword("");
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <ArrowLeft size={20} className="mb-2" onClick={() => redirect("/")} cursor="pointer" />
                    <CardTitle>Resetar Senha</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Input
                                    id="Password"
                                    type="password"
                                    value={password}
                                    placeholder="Digite a sua nova Senha"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
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
