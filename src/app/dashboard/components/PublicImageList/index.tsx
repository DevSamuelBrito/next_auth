
import { CardImageDashBoard } from "./components/CardImageDashboard";

export interface PublicImage {
    id: string;
    secureUrl: string;
    publicId: string;
    userId: string;
    name: string;
    description: string;
    createAt: Date;
    isPrivate: boolean;
    isFavorite:boolean;
}

const PublicImagesList = ({ images }: { images: PublicImage[] }) => {

    if (!images.length) {
        return <div className="flex items-center justify-center col-span-full row-span-full min-h-[400px]">
            <p className="text-center text-gray-200">Nenhuma Imagem Encontrada</p>
        </div>;
    }


    return (
        <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3 w-full">
                {
                    images.map((image, index) => (
                        <div className="bg-[#292828] rounded-2xl border-[1px] border-gray flex flex-col items-center justify-center" key={image.id}>
                            <CardImageDashBoard key={index} img={image} />
                            <div className="flex flex-col items-center w-[200px] justify-center  overflow-hidden">
                                <p className="font-bold  overflow-hidden whitespace-nowrap text-ellipsis w-full text-center">{image.name}</p>
                                <p className="italic overflow-hidden whitespace-nowrap text-ellipsis w-full text-center">
                                    {image.description}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>

        </>

    )
}

export default PublicImagesList;