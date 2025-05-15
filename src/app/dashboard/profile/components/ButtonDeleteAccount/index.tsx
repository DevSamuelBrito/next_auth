import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@radix-ui/react-dialog";

const deleteAccount = async () => {
    const res = await fetch("",{
        
    })
}

const ButtonDeleteAccount = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="cursor-pointer" >Excluir Conta</Button>
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
                        <Button variant="destructive" className="cursor-pointer">
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