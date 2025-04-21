"use client";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

export function DialogExemplo() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Abrir Pop-up</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Deseja Excluir?</DialogTitle>
                    <DialogDescription>
                        Essa ação não pode ser desfeita. Você tem certeza que deseja continuar?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-4">
                    <DialogFooter>
                        <Button variant="outline">Excluir</Button>
                    </DialogFooter>
                    <DialogFooter>
                        <Button variant="outline">Fechar</Button>
                    </DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}
