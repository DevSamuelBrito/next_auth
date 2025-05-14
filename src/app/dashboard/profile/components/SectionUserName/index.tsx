"use client";

import { Button } from "@/components/ui/button";
import { SimpleUser } from "@/types/user";
import { redirect } from "next/navigation";

interface SectionProfileNameProps {
    user: SimpleUser;
}

const SectionUserName = ({ user }: SectionProfileNameProps) => {
    return (
        <div className="flex items center justify-between w-full p-6">
            <div className="flex justify-center items-center gap-x-36">
                <span className="text-[#96938d] text-sm font-bold w-28">Nome do Perfil:</span>
                <span className="font-bold text-white ">
                    {user?.name || "Usuário"}
                </span>
            </div>
            <div className="flex items-center justify-center">
                <Button onClick={()=> redirect("/changename")} className="cursor-pointer">
                    Alterar
                </Button>
            </div>
        </div>
    );
}

export default SectionUserName;