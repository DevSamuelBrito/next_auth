// app/favorites/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import PublicImagesList from "../components/PublicImageList";

export default async function FavoritesPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/login");
    }

    const favoriteImages = await prisma.favoriteImage.findMany({
        where: {
            userEmail: session.user.email,
            image: {
                isPrivate: false,
            }
        },
        include: {
            image: true,
        },
    });

    const images = favoriteImages.map((fav) => ({
        ...fav.image,
        isFavorite: true,
    }));

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Minhas Fotos Salvas</h1>
            <PublicImagesList images={images} />
        </div>
    );
}
