import { Download, Trash} from "lucide-react";
import Image from "next/image";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function CardImagem({ img, onDelete }: { img: any, onDelete: (id: string) => void }) {

    const [loading, setLoading] = useState(false);
    const [imageStatus, setImageStatus] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchImageStatus = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/images/${img.id}/visibility`);
                const data = await res.json();
                setImageStatus(data.isPrivate);
            } catch (err) {
                toast.error("Erro ao buscar status da imagem");
            } finally {
                setLoading(false);
            }
        };

        fetchImageStatus();
    }, [img.id]);

    const handleVisibilityToggle = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/images/${img.id}/visibility`, {
                method: 'PATCH',
            });

            if (!res.ok) {
                throw new Error("Erro ao atualizar visibilidade da imagem");
            }

            const data = await res.json();
            setImageStatus(data.isPrivate);
            toast.success(`Imagem ${data.isPrivate ? "tornada privada" : "tornada pública"} com sucesso!`);
        } catch (err) {
            toast.error("Erro ao atualizar visibilidade da imagem");
        } finally {
            setLoading(false);
        }
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

    const formattedDate = new Intl.DateTimeFormat('pt-br', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(new Date(img.createAt));

    return (
        <div key={img.id} className="relative group bg-black w-full rounded-2xl">
            <Dialog>
                <DialogHeader>
                    <DialogTitle className="sr-only">Visualizar imagem</DialogTitle>
                </DialogHeader>
                {/* Dialog para PREVIEW */}
                <DialogTrigger asChild className="z-10 mt-1">
                    <div className="relative aspect-video rounded-xl bg-black overflow-hidden">
                        <Image
                            src={img.secureUrl}
                            alt={`Image ${img.id}`}
                            className="object-contain rounded-xl cursor-pointer transition duration-200"
                            fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                        />
                    </div>
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

                        {/* Botão fixo ao final */}
                        <div className="pt-4 border-t border-zinc-200">
                            <Button
                                disabled={loading}
                                variant={"secondary"}
                                onClick={handleVisibilityToggle}
                                className="w-full"
                            >
                                {loading ? "Carregando..." : imageStatus ? "Tornar Pública" : "Tornar Privada"}
                            </Button>
                        </div>
                        <div className="pt-4 border-t border-zinc-200">

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

            {/* Dialog para EXCLUSÃO */}
            <Dialog>
                <DialogTrigger asChild>
                    <button
                    aria-label="Botão de deletar"
                        className="z-20 absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition border-2 border-white hover:scale-110 duration-150"
                    >
                        <Trash className="text-white" />
                    </button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deseja excluir esta imagem?</DialogTitle>
                        <DialogDescription>
                            Essa ação não poderá ser desfeita. A imagem será removida permanentemente.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                variant="destructive"
                                className="hover:cursor-pointer hover:bg-red-500/80"
                                onClick={() => onDelete(img.publicId)}
                            >
                                Confirmar exclusão
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button className="hover:cursor-pointer" variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
