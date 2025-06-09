import { Trash } from "lucide-react";
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
                console.log("Data do fetchImage:", data);
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

    const formattedDate = new Intl.DateTimeFormat('pt-br', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(new Date(img.createAt));

    return (
        <div key={img.id} className="relative group">
            {/* Dialog para PREVIEW */}
            <Dialog>
                <DialogHeader>
                    <DialogTitle className="sr-only">Visualizar imagem</DialogTitle>
                </DialogHeader>
                <DialogTrigger asChild className=" z-10 aspect-video rounded-xl  bg-zinc-500 overflow-hidden">
                    <Image
                        src={img.secureUrl}
                        alt={`Image ${img.id}`}
                        className="w-full h-full object-contain rounded-xl cursor-pointer transition duration-200"
                        width={300}
                        height={200}
                    />
                </DialogTrigger>

                <DialogContent
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className="p-0 bg-white rounded-xl overflow-hidden max-w-[90vw] md:max-w-[600px] max-h-[80vh] flex flex-col"
                >
                    <div className="flex-shrink-0 w-full max-h-[60%]">
                        <Image
                            src={img.secureUrl}
                            alt={`Preview ${img.id}`}
                            width={800}
                            height={600}
                            className="w-full h-full object-contain bg-black"
                        />
                    </div>

                    <div className="flex-1 overflow-auto p-4 pt-0 flex flex-col gap-2">
                        <div className="w-1/4">
                            <Button
                                disabled={loading}
                                variant={"secondary"}
                                onClick={handleVisibilityToggle}
                            >
                                {loading ? "Carregando..." : imageStatus ? "Tornar Pública" : "Tornar Privada"}
                            </Button>
                        </div>
                        <div className="flex flex-row justify-between items-center  w-full">
                            <h2 className="text-lg text-black font-bold w-1/2">{img.name}</h2>
                            <p className="italic overflow-hidden whitespace-nowrap text-ellipsis  text-black text-end w-1/2">
                                {formattedDate}
                            </p>
                        </div>
                        <p className="text-gray-600 break-words whitespace-pre-wrap">
                            {img.description}
                        </p>
                    </div>
                </DialogContent>

            </Dialog>

            {/* Dialog para EXCLUSÃO */}
            <Dialog>
                <DialogTrigger asChild>
                    <button
                        className="z-1 absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition border-2 border-white hover:scale-110 duration-150"
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
