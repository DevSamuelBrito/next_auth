"use client";
import { User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PhotoProfiileProps {
    image?: string | null;
}

const PhotoProfile = ({ image }: PhotoProfiileProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(image || null);

    useEffect(() => {
        if (image) {
            setPreview(image);
        }
    }, [image]);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/user/photo", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("Imagem enviada com sucesso");
            setPreview(data.imageUrl);
        } else {
            toast.error("Erro ao enviar a imagem");
            setPreview(null);
        }
    };

    const handleDelete = async () => {
        const res = await fetch("/api/user/deletepictureprofile", {
            method: "DELETE",
        });
        if (res.ok) {
            toast.success("Imagem excluída com sucesso");
            setPreview(null);
        }
        else {
            toast.error("Erro ao excluir a imagem");
        }
    }

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <input
                aria-label="alterar imagem de perfil"
                type="file"
                onChange={handleChange}
                accept="image/*"
                ref={inputRef}
                className="hidden"
            />
            <div
                className="w-52 h-52 rounded-full overflow-hidden bg-black flex items-center justify-center"

            >
                {preview ? (
                    <Image
                        src={preview}
                        alt="User"
                        width={208}
                        height={208}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <User size={120} className="text-white" />
                )}
            </div>

            <div className="flex w-11/12 flex-col gap-4 sm:flex-row">
                <Button type="button" className="cursor-pointer w-full sm:w-auto" onClick={() => inputRef.current?.click()}>
                    Adicionar Imagem
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive" disabled={!preview} className="cursor-pointer hover:!bg-red-900" >Excluir Imagem</Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Tem certeza que deseja excluir?</DialogTitle>
                            <DialogDescription>
                                Essa imagem será excluída permanentemente e não poderá ser recuperada.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="destructive" onClick={handleDelete} className="cursor-pointer hover:!bg-red-900">
                                    Confirmar
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button variant="outline" className="cursor-pointer">Cancelar</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    );
};

export default PhotoProfile;
