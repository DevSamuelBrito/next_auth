"use client";

import { Button } from "@/components/ui/button";
import { SimpleUser } from "@/types/user";
import { redirect } from "next/navigation";

interface SectionUsernameProps {
    user: SimpleUser;
}

const SectionUsername = ({ user }: SectionUsernameProps) => {
    return (
        <div className="flex items center justify-between w-full p-6">
            <div className="flex justify-center items-center gap-x-36">
                <span className="text-[#96938d] text-sm font-bold w-28">Username do Perfil:</span>
                <span className="font-bold text-white ">
                    {user?.username || "Usuário"}
                </span>
            </div>
            <div className="flex items-center justify-center">
                <Button onClick={()=> redirect("/changeusername")} className="cursor-pointer">
                    Alterar
                </Button>
            </div>
        </div>
    );
}

export default SectionUsername;