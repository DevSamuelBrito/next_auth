
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import PublicImagesList from "./components/PublicImageList";

export default async function Dashboard() {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }


    const publicImages = await prisma.userImage.findMany({
        where: { isPrivate: false },
        include: {
            FavoriteImage: {
                where: {
                    userEmail: session?.user?.email || "",
                }
            }
        }
    })

    const imagesWithFavoriteFlag = publicImages.map((img) => ({
        ...img,
        isFavorite: img.FavoriteImage.length > 0,
    }));


    return (

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="text-2xl font-bold">Imagens Públicadas:</h1>
            <PublicImagesList images={imagesWithFavoriteFlag} />
        </div>

    )
}

