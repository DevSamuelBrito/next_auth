"use client";
import { Button } from "@/components/ui/button";

const SectionEditPassword = () => {
    return (
        <div className="flex items center justify-between w-full p-6">
            <div className="flex justify-center items-center gap-x-36">
                <span className="text-[#96938d] text-sm font-bold w-28">Senha:</span>
                <span className="font-bold text-white ">
                    ********
                </span>
            </div>
            <div className="flex items-center justify-center">
                <Button>
                    Alterar
                </Button>
            </div>
        </div>
    );
}

export default SectionEditPassword;