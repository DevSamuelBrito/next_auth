"use client";

import { SimpleUser } from "@/types/user";

interface SectionEmailProps {
    user: SimpleUser
}

const SectionEmail = ({ user }: SectionEmailProps) => {
    return (
           <div className="flex flex-col items-center justify-between w-full p-6 sm:flex-row mb-0">
             <div className="flex flex-col justify-between sm:justify-center items-center gap-x-36 sm:flex-row ">
                <span className="text-[#96938d] text-sm font-bold w-28 text-center">Email do Perfil:</span>
                <span className="font-bold text-white ">
                    {user?.email || "Usuário"}
                </span>
            </div>
        </div>
    );
}

export default SectionEmail;