"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const EditPasswordSection = () => {
    const [editPassword, setEditPassword] = useState(false);

    return (
        editPassword ? (
            <form className="flex flex-col items-center justify-center space-y-4 w-full">
                <input type="password" placeholder="Senha Atual" className="w-1/2 bg-[#171717] border border-[#96938d] rounded-lg p-2 text-white" />
                <input type="password" placeholder="Nova Senha" className="w-1/2 bg-[#171717] border border-[#96938d] rounded-lg p-2 text-white  outline-white" />
                <input type="password" placeholder="Confirmar Senha" className="w-1/2 bg-[#171717] border border-[#96938d] rounded-lg p-2 text-white  outline-white" />
                <Button variant="outline" className="w-1/2" onClick={() => setEditPassword(false)}>
                    Salvar Senha
                </Button>
                <Button variant="secondary" className="w-1/2" onClick={() => setEditPassword(false)}>
                    Cancelar
                </Button>
            </form>
        ) : (
            <Button variant="secondary" className="w-1/2" onClick={() => {
                setEditPassword(true);
            }}>
                Editar Senha
            </Button>
        )
    );
}

export default EditPasswordSection;