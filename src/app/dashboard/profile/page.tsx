"use client"
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useState } from "react";

const Profile = () => {

    const [editPassword, setEditPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    if (loading) {
        console.log("Loading...");
    }


    return (
        <div className="space-y-4 flex flex-col items-center justify-center 2xl:mx-24 mx-16 bg-[#171717] rounded-2xl mb-4 p-4">
            <div className="bg-black rounded-full w-24 h-24 flex items-center justify-center">
                <User size={40} className="text-white" />
            </div>
            <p>
                <span className="font-bold text-[#96938d] hover:text-white cursor-pointer mt-4">
                    Samuel
                </span>
            </p>
            <Button variant="outline" className="w-1/2" >
                Editar Nome
            </Button>

            {
                editPassword ? (
                    <form className="flex flex-col items-center justify-center space-y-4 w-full">
                        <input type="password" placeholder="Senha Atual" className="w-1/2 bg-[#171717] border border-[#96938d] rounded-lg p-2 text-white" />
                        <input type="password" placeholder="Nova Senha" className="w-1/2 bg-[#171717] border border-[#96938d] rounded-lg p-2 text-white  outline-white" /> 
                        <input type="password" placeholder="Confirmar Nova Senha" className="w-1/2 bg-[#171717] border border-[#96938d] rounded-lg p-2 text-white  outline-white" /> 
                        <Button variant="outline" className="w-1/2" onClick={() => setEditPassword(false)}>
                            Cancelar
                        </Button>
                    </form>
                ) : (
                    <Button variant="outline" className="w-1/2" onClick={() => setEditPassword(true)}>
                        Editar Senha
                    </Button>
                )
            }


        </div >
    );
}

export default Profile;

