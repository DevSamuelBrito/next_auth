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
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner";

export function ChangeUsernameCard({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [username, setuserName] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/change-username", {
            method: "POST",
            body: JSON.stringify({
                username: username
            }),
        })
        const data = await res.json();

        if (!res.ok) {
            toast.error(data.error);
            return;
        }
        toast.success("UserName alterado com sucesso");
        setuserName("");
        redirect("/dashboard/profile");
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <ArrowLeft size={20} className="mb-2" onClick={() => redirect("/dashboard/profile")} cursor="pointer" />
                    <CardTitle>Alterar Username</CardTitle>
                    <CardDescription>
                        Preencha os campos abaixo para alterar seu Username.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Input
                                    id="name"
                                    type="text"
                                    value={username}
                                    placeholder="Digite seu novo Username aqui"
                                    required
                                    onChange={(e) => setuserName(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Alterar Username
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
