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

export function ChangeNameCard({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [name, setName] = useState("");
    const [currentlyName, setCurrentlyName] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/change-name", {
            method: "POST",
            body: JSON.stringify({
                name: name
            }),
        })

        if (!res.ok) {
            toast.error("Erro ao alterar nome");
            return;
        }
        toast.success("Nome alterado com sucesso");
        setName("");
        redirect("/dashboard/profile");
    }

    const fetchCurrentUser = async () => {
        const res = await fetch("/api/user")
        if (!res.ok) {
            setName("Erro ao buscar usuário");
            return;
        }
        const data = await res.json();
        setCurrentlyName(data.name);
    }

    useEffect(() => {
        fetchCurrentUser();
    }, [])

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <ArrowLeft size={20} className="mb-2" onClick={() => redirect("/dashboard/profile")} cursor="pointer" />
                    <CardTitle>Alterar Nome</CardTitle>
                    <CardDescription>
                        Preencha os campos abaixo para alterar seu Nome.
                    </CardDescription>
                    <CardDescription>
                        Seu Username atual é: <strong>{currentlyName}</strong>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    placeholder="Digite seu novo nome aqui"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Alterar Nome
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
