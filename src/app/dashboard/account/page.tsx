import { authOptions } from "@/lib/auth";
import ImageUpload from "./components/ImageUpload";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ButtonLogOut from "./components/ButtonLogOut";
import { DialogExemplo } from "./components/Teste";


const Account = async () => {

    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/");
    }

    const user = session.user;
    return (
        <div className="flex flex-col">
            Bem vindo(a) {user?.name || 'User'} 
           <ButtonLogOut />
            <ImageUpload />
        </div>
    );
}

export default Account;