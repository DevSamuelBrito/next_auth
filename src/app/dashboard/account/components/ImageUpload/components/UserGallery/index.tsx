"use client";
import CardContainer from "../CardContainer";
import { ImageData } from "@/types/imageData";

interface UserGalleryProps {
    session: {
        user?: {
            name?: string;
        }
    },
    imageUrl: ImageData[],
    setImageUrl: React.Dispatch<React.SetStateAction<ImageData[]>>
    loadingImage: boolean;
}

const UserGallery = ({ imageUrl, session, setImageUrl, loadingImage }: UserGalleryProps) => {
    let content;

    if (loadingImage) {
        content = (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 w-full">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-[#292828] rounded-2xl border border-gray-700 flex flex-col items-center justify-center animate-pulse h-52 w-full"
                    />
                ))}
            </div>

        );
    } else if (imageUrl.length === 0) {
        content = (
            <p className="italic mt-4 mb-8 max-w-9/12">Você não fez upload de nenhuma imagem ainda...</p>
        );
    } else {
        content = (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {imageUrl.map((img) => (
                    <CardContainer img={img} setImageUrl={setImageUrl} key={img.id} />
                ))}
            </div>
        );
    }
    return (
        <div className="flex flex-col items-center justify-center 2xl:mx-24 mx-10 mb-24 bg-[#171717] rounded-2xl ">
            <div className="flex items-start mt-4 w-11/12">
                <p className="md:text-start text-[#96938d] hover:text-white transition-all duration-300 text-lg cursor-default text-center">
                    {session?.user?.name ? `Galeria de ${session.user.name}:` : "Sua Galeria:"}
                </p>
            </div>
            {content}
        </div>
    );
}

export default UserGallery;