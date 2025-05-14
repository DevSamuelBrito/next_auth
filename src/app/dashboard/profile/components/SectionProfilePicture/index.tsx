"use client";
import { SimpleUser } from "@/types/user";
import PhotoProfile from "../PhotoProfile";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Image from "next/image";
import { User } from "lucide-react";

interface SectionProfilePictureProps {
    user: SimpleUser;
}

const SectionProfilePicture = ({ user }: SectionProfilePictureProps) => {
    return (
        <>
            <div className="flex items center justify-between w-full p-6">
                <div className="flex justify-center items-center gap-x-36">
                    <span className="text-[#96938d] text-sm font-bold w-28">Foto de perfil</span>
                    {
                        user?.profilePicture ? (
                            <Image
                                src={user?.profilePicture}
                                alt="User"
                                width={124}
                                height={124}
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        ) : (
                             <Image
                                src={"/avatar.svg"}
                                alt="User"
                                width={124}
                                height={124}
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        )
                    }
                </div>
                <div className="flex items-center justify-center">
                    <Button className="cursor-pointer" onClick={() => { redirect("/changepicture") }}>
                        Alterar
                    </Button>
                </div>
            </div>
        </>
    );
}

export default SectionProfilePicture;