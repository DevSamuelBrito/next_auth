"use client"
import { Download, Heart, HeartOff } from "lucide-react";
import Image from "next/image";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PublicImage } from "../..";
import { useState } from "react";

interface CardImageDashBoardProps {
    img: PublicImage;
}


const handleDownload = async (url: string, filename: string) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();

        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
        toast.success("Imagem baixada com sucesso");
    } catch (error) {
        toast.error("Erro ao baixar a imagem");
    }
};

export function CardImageDashBoard({ img }: CardImageDashBoardProps) {

    const [isFavorite, setIsFavorite] = useState(img.isFavorite);
    const [isLoading, setIsLoading] = useState(false);

    const formattedDate = new Intl.DateTimeFormat('pt-br', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(new Date(img.createAt));

    const toogleFavorite = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/favorite", {
                method: isFavorite ? "DELETE" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageId: img.id
                })
            })

            if (!response.ok) {
                toast.error("Erro ao atualizar favorito");
            }
            setIsFavorite(!isFavorite);
            toast.success(img.isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos");

        } catch (error) {
            toast.error("Erro ao favoritar a imagem");
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <div key={img.id} className="relative group bg-black w-full rounded-2xl">
            <Dialog>
                <DialogHeader>
                    <DialogTitle className="sr-only">Visualizar imagem</DialogTitle>
                </DialogHeader>
                {/* Dialog para PREVIEW */}
                <DialogTrigger asChild className=" z-10 aspect-video rounded-xl  bg-black overflow-hidden">
                    <Image
                        src={img.secureUrl}
                        alt={`Image ${img.id}`}
                        className="w-full h-full object-contain rounded-xl cursor-pointer transition duration-200"
                        width={300}
                        height={200}
                    />
                </DialogTrigger>
                {/*Dialog quando aberto o Modal*/}
                <DialogContent
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className="p-0 bg-white rounded-xl overflow-hidden min-w-[60vw] min-h-[30vw] max-w-[90vw] max-h-[90vh] flex flex-col md:flex-row text-white md:text-black"
                >
                    {/* Lado da imagem */}
                    <div className="w-full md:w-[70%] h-[300px] md:h-auto bg-black flex items-center justify-center">
                        <Image
                            src={img.secureUrl}
                            alt={`Preview ${img.id}`}
                            width={800}
                            height={600}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>

                    {/* Lado do conteúdo */}
                    <div className="w-full md:w-[30%] h-full flex flex-col p-4 pt-10">
                        {/* Conteúdo com scroll */}
                        <div className="flex-1 overflow-auto pr-1">
                            <h2 className="text-lg font-bold text-black">{img.name}</h2>
                            <p className="text-sm italic text-zinc-600">{formattedDate}</p>
                            <p className="text-gray-600 break-words whitespace-pre-wrap mt-2">
                                {img.description}
                            </p>
                        </div>
                        <div className="pt-4 border-t border-zinc-200 flex flex-col gap-2">
                            <Button
                                variant={"secondary"}
                                className="w-full"
                                onClick={toogleFavorite}
                                disabled={isLoading}
                            >
                                {
                                    isFavorite ? (
                                        <>
                                            Desfavoritar Foto <HeartOff />
                                        </>
                                    ) : (
                                        <>
                                            Salvar Foto <Heart />
                                        </>
                                    )
                                }
                            </Button>
                            <a download={img.secureUrl}>
                                <Button
                                    onClick={() => handleDownload(img.secureUrl, img.name)}
                                    variant={"secondary"}
                                    className="w-full"
                                >
                                    Baixar Foto <Download />
                                </Button>
                            </a>

                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
