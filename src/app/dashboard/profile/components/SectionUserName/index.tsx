"use client";

import { Button } from "@/components/ui/button";
import { SimpleUser } from "@/types/user";
import { redirect } from "next/navigation";

interface SectionProfileNameProps {
    user: SimpleUser;
}

const SectionName = ({ user }: SectionProfileNameProps) => {
    return (
        <div className="flex flex-col items-center justify-between w-full p-6 sm:flex-row mb-0">
            <div className="flex flex-col justify-between sm:justify-center items-center gap-x-36 sm:flex-row ">
                <span className="text-[#96938d] text-sm font-bold w-28 text-center mb-2 sm:mb-0">Nome do Perfil:</span>
                <span className="font-bold text-white ">
                    {user?.name || "Usuário"}
                </span>
            </div>
            <div className="flex items-center justify-center mt-4 sm:mt-0 mb-0">
                <Button onClick={()=> redirect("/changename")} className="cursor-pointer">
                    Alterar
                </Button>
            </div>
        </div>
    );
}

export default SectionName;