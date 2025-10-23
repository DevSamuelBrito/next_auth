"use client";

import { Button } from "@/components/ui/button";
import { SimpleUser } from "@/types/user";
import { redirect } from "next/navigation";

interface SectionUsernameProps {
    user: SimpleUser;
}

const SectionUsername = ({ user }: SectionUsernameProps) => {
    return (
          <div className="flex flex-col items-center justify-between w-full p-6 sm:flex-row mb-0">
            <div className="flex flex-col justify-between sm:justify-center items-center gap-x-36 sm:flex-row ">
                <span className="text-[#96938d] text-sm font-bold w-28 text-center">Username: </span>
                <span className="font-bold text-white ">
                    {user?.username || "Usuário"}
                </span>
            </div>
            <div className="flex items-center justify-center mt-4 sm:mt-0 mb-0">
                <Button onClick={()=> redirect("/changeusername")} className="cursor-pointer">
                    Alterar
                </Button>
            </div>
        </div>
    );
}

export default SectionUsername;