"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


const EditNameSection = () => {
    const [editName, setEditName] = useState(false);
    const [name, setName] = useState("");

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
        setEditName(false);
        setName("");
    }

    return (

        editName ? (
            <form className="flex flex-col items-center justify-center space-y-4 w-full" >
                <input
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    type="text"
                    placeholder="Nome"
                    className="w-1/2 bg-[#171717] border border-[#96938d] rounded-lg p-2 text-white"
                />
                <Button variant="outline" className="w-1/2" onClick={handleSubmit}>
                    Salvar Nome
                </Button>
                <Button variant="secondary" className="w-1/2 mb-5" onClick={() => setEditName(false)}>
                    Cancelar
                </Button>
            </form >
        ) : (
            <Button variant="secondary" className="w-1/2 mb-5" onClick={() => {
                setEditName(true);
            }
            }>
                Editar Nome
            </Button>
        )

    )
}

export default EditNameSection;