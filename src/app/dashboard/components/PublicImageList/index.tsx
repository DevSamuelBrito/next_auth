"use client";

import { useState } from "react";
import Image from "next/image";

interface PublicImage {
    id: string;
    secureUrl: string;
    publicId: string;
    userId: string;
    name: string;
    description: string;
    createAt: Date;
    isPrivate: boolean;
}

const PublicImagesList = ({ images }: { images: PublicImage[] }) => {
    const [selectedImage, setSelectedImage] = useState<PublicImage | null>(null);




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
                        <div key={index} className="aspect-video rounded-xl">
                            <Image
                                onClick={() => setSelectedImage(image)}
                                src={image.secureUrl}
                                alt={`Image ${index}`}
                                className="w-full h-full object-cover rounded-xl"
                                width={300}
                                height={200}
                            />
                        </div>
                    ))
                }
            </div>
            {selectedImage && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>
                        <Image
                            src={selectedImage.secureUrl}
                            alt={selectedImage.name}
                            width={500}
                            height={300}
                            className="rounded-md mb-4"
                        />
                        <h2 className="text-lg font-semibold mb-2">{selectedImage.name}</h2>
                        <p className="text-sm text-gray-600 mb-4">{selectedImage.description}</p>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={() => {
                                // Aqui você chama uma função para salvar nos favoritos
                                console.log("Salvar imagem:", selectedImage.id);
                            }}
                        >
                            Salvar nos Favoritos
                        </button>
                    </div>
                </div>
            )}
        </>

    )
}

export default PublicImagesList;