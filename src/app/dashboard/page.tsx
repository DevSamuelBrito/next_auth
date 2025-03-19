import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ButtonLogOut } from "./components/buttonLogOut";
export default async function Dashboard() {
    const session = await getServerSession();
    if (!session) {
        redirect("/");
    }

    return (
        <div>
            <h1>Olá {session?.user?.name}</h1>
            <h1>Seu email é: {session?.user?.email}</h1>
            <p>Seja bem vindo ao painel de controle</p>
            <ButtonLogOut />
        </div>
    );
}

