import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
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
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink>
                                        All Photos
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
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
            </SidebarInset>
        </SidebarProvider>
    )
}



{

}