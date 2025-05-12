"use client";

import { SimpleUser } from "@/types/user";

interface SectionEmailProps {
    user: SimpleUser
}

const SectionEmail = ({ user }: SectionEmailProps) => {
    return (
        <div className="flex items center justify-between w-full p-6">
            <div className="flex justify-center items-center gap-x-36">
                <span className="text-[#96938d] text-sm font-bold w-28">Email do Perfil:</span>
                <span className="font-bold text-white ">
                    {user?.email || "Usuário"}
                </span>
            </div>
        </div>
    );
}

export default SectionEmail;