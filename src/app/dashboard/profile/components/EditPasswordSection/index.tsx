"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const EditPasswordSection = () => {
    const [editPassword, setEditPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("") //senha atual
    const [newPassword, setNewPassword] = useState(""); // nova senha
    const [confirmPassword, setConfirmPassword] = useState(""); // confirmar nova senha


    const handlSubmit = async (e: React.FormEvent) => {
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

        const data = await res.json();

        if (!res.ok) {
            toast.error("Erro ao alterar senha");
            return;
        }

        toast.success("Senha alterada com sucesso");
        setEditPassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    }

    return (
        editPassword ? (
            <form className="flex flex-col items-center justify-center space-y-4 w-full mb-4">
                <input
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    type="password"
                    placeholder="Senha Atual"
                    className="w-1/2 bg-[#171717] border border-[#96938d] rounded-lg p-2 text-white" />
                <input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    placeholder="Nova Senha"
                    className="w-1/2 bg-[#171717] border border-[#96938d] rounded-lg p-2 text-white  outline-white" />
                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder="Confirmar Senha"
                    className="w-1/2 bg-[#171717] border border-[#96938d] rounded-lg p-2 text-white  outline-white" />
                <Button variant="outline" className="w-1/2" onClick={handlSubmit}>
                    Salvar Senha
                </Button>
                <Button variant="secondary" className="w-1/2 " onClick={() => setEditPassword(false)}>
                    Cancelar
                </Button>
            </form>
        ) : (
            <Button
                variant="secondary"
                className="w-1/2 mb-4"
                onClick={() => {
                    setEditPassword(true);
                }}>
                Editar Senha
            </Button>
        )
    );
}

export default EditPasswordSection;