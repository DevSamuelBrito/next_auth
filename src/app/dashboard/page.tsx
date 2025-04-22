
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { redirect } from "next/navigation";



export default async function Page() {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/");
    }


    const user = await prisma.user.findMany({
        select: { images: true }
    })

    const allImages = user.flatMap(user => user.images || []);
    // const allImages = [];


    return (

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <p>All Photos</p>
            {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
            <div className="grid auto-rows-min gap-4 md:grid-cols-3 w-full">
                {
                    allImages.length > 0 ? (

                        allImages.map((image, index) => (
                            image ? (

                                <div key={index} className="aspect-video rounded-xl">
                                    <Image
                                        src={image.secureUrl}
                                        alt={`Image ${index}`}
                                        className="w-full h-full object-cover rounded-xl"
                                        width={300}
                                        height={200}
                                    />
                                </div>
                            ) : null
                        ))
                    ) : (
                        <div className="flex items-center justify-center col-span-full row-span-full min-h-[400px]">
                            <p className="text-center text-gray-200">Nenhuma Imagem Encontrada</p>
                        </div>
                    )}
            </div>
        </div>
    )
}

