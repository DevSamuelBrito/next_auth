import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react"
import PhotoProfile from "@/app/dashboard/profile/components/PhotoProfile";

export function ChangeImageCard({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [imageUrl, setImageUrl] = useState<string>(""); 

    const fetchImage = async () => {
        const res = await fetch("/api/user/profile-image",
            {
                method: "GET",
                cache: "no-store",
            }
        );
        const data = await res.json();
        setImageUrl(data.profilePicture);
    }

    useEffect(()=>{
        fetchImage();
    },[])

  
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <ArrowLeft size={20} className="mb-2" onClick={() => redirect("/dashboard/profile")} cursor="pointer" />
                    <CardTitle>Alterar Imagem de Perfil:</CardTitle>
                    <CardDescription>
                        Seleciona uma imagem para o seu perfil.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-center">
                                <PhotoProfile image={imageUrl}/>
                            </div>
                        </div>
                </CardContent>
            </Card>
        </div>
    )
}
