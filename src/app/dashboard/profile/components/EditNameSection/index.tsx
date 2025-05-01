"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";


const EditNameSection = () => {
    const [editName, setEditName] = useState(false);

    return (

        editName ? (
            <form className="flex flex-col items-center justify-center space-y-4 w-full" >
                <input type="text" placeholder="Nome" className="w-1/2 bg-[#171717] border border-[#96938d] rounded-lg p-2 text-white" />
                <Button variant="outline" className="w-1/2" onClick={() => setEditName(false)}>
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