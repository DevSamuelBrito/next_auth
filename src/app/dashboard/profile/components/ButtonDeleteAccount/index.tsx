"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { signOut } from "next-auth/react";
import { toast } from "sonner";




const ButtonDeleteAccount = () => {
    const deleteAccount = async () => {
        const res = await fetch(`/api/user/delete`, {
            method: "DELETE"
        })
        if (!res.ok) {
            toast.error("Erro ao deletar conta");
        } else {
            toast.success("Conta deletada com sucesso você será redirecionado...");
            setTimeout(() => signOut({ callbackUrl: "/" }), 2000);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="cursor-pointer" >Excluir Conta</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tem certeza que deseja excluir sua conta?</DialogTitle>
                    <DialogDescription>
                        Sua conta e todos os dados associados a ela serão excluídos permanentemente. Esta ação não pode ser desfeita.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive" onClick={deleteAccount} className="cursor-pointer">
                            Confirmar
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="outline" className="cursor-pointer">Cancelar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ButtonDeleteAccount;