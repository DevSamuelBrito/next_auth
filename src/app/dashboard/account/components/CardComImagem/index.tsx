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

export function CardImagem({ img, onDelete }: { img: any, onDelete: (id: string) => void }) {
    return (
        <div key={img.id} className="relative aspect-video rounded-xl group">
            {/* Dialog para PREVIEW */}
            <Dialog>
                <DialogHeader>
                    <DialogTitle className="sr-only">Visualizar imagem</DialogTitle>
                </DialogHeader>
                <DialogTrigger asChild>
                    <Image
                        src={img.secureUrl}
                        alt={`Image ${img.id}`}
                        className="w-full h-full object-cover rounded-xl cursor-pointer hover:brightness-75 transition"
                        width={300}
                        height={200}
                    />
                </DialogTrigger>
                <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="max-w-fit bg-transparent border-none shadow-none p-0  [&>button.absolute]:text-black [&>button.absolute]:text-3xl" >
                    <Image
                        src={img.secureUrl}
                        alt={`Preview ${img.id}`}
                        width={900}
                        height={600}
                        className="rounded-xl object-contain"
                    />
                </DialogContent>
            </Dialog>

            {/* Dialog para EXCLUSÃO */}
            <Dialog>
                <DialogTrigger asChild>
                    <button
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition border-2 border-white hover:scale-110 duration-150"
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
