
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import PublicImagesList from "./components/PublicImageList";

export default async function Dashboard() {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/");
    }

    const publicImages = await prisma.userImage.findMany({
        where: { isPrivate: false }
    })

    return (

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <p>Imagens Públicadas:</p>
            <PublicImagesList images={publicImages} />
        </div>

    )
}

