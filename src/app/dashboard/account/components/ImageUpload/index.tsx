"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


export default function ImageUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string[]>([]); // mudando o useSte para um array de string
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null)
    const [uploadError, setUploadError] = useState(false);


    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        }
    }, [preview]);

    useEffect(() => {
        const fetchImages = async () => {
            const res = await fetch("/api/getImagesUser");
            const data = await res.json();
            setImageUrl(data.images);
        }

        fetchImages();
    }, [])

    const handleUpload = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        if (!file) {
            setUploadError(true);
            return;
        };

        setLoading(true);

        const formData = new FormData();
        formData.append("file", file)

        const res = await fetch("/api/upload", { //sempre colocar / antes do nome da rota para nao dar problema
            method: "POST",
            body: formData,
        });

        const text = await res.text(); // Obtém a resposta como um text
        setUploadError(false);
        console.log("Resposta do servidor:", text);

        try {
            const data = JSON.parse(text); // aqui eu tento  converter para JSON
            setLoading(false);

            if (data.secure_url) {
                setImageUrl((prev) => [...prev, data.secure_url]);// aqui ele vai pegar o array anterior e vai adicionar a nova imagem.
                toast.success("Imagem enviada com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao converter JSON:", error);
            toast.error("Erro ao fazer upload da imagem.");
        }
        setLoading(false);
        setPreview(null);
    }

    return (
        <div>
            <form
                className="space-y-4 flex flex-col items-center justify-center mx-48 bg-[#171717] rounded-2xl mb-4"
                onSubmit={handleUpload}
            >
                <label
                    htmlFor="imageInput"
                    className="text-bold text-[#96938d] hover:text-white cursor-pointer mt-4"
                >
                    Selecionar Imagem
                </label>

                <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const selectedFile = e.target.files?.[0] || null;
                        setFile(selectedFile);
                        setUploadError(false);

                        if (selectedFile) {
                            const objectUrl = URL.createObjectURL(selectedFile);
                            setPreview(objectUrl);
                        } else {
                            setPreview(null);
                        }
                    }}
                    className="hidden"
                />

                {preview && (
                    <div className="mt-4 flex flex-col items-center">
                        <p className="text-base text-gray-400 mb-2">Preview:</p>
                        <Image
                            src={preview}
                            alt="Preview da imagem selecionada"
                            width={300}
                            height={200}
                            className="rounded-xl object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setFile(null);
                                setPreview(null);
                            }}
                            className="mt-2 text-red-500 hover:underline text-sm"
                        >
                            Remover Imagem
                        </button>
                    </div>
                )}

                <Button variant="outline" className="mt-4 mb-4 w-52" type="submit" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar Imagem"}
                </Button>
                {
                    uploadError && (
                        <p className="mb-2 text-red-500">Você precisa selecionar uma Imagem para fazer Upload!</p>
                    )
                }
            </form>

            <div className="flex flex-col items-center justify-center mx-48 bg-[#171717] rounded-2xl">
                <div className="flex items-start mt-4 w-11/12">
                    <p className="text-start text-[#96938d] hover:text-white">
                        Suas Imagens:
                    </p>
                </div>
                {
                    imageUrl.length > 0 ? (
                        <div className="mt-4 grid grid-cols-3 gap-4 mb-4">
                            {
                                imageUrl.map((url, index) => (
                                    <div key={index} className="aspect-video rounded-xl">
                                        <Image
                                            src={url.toString()}
                                            alt={`Image ${index}`}
                                            className="w-full h-full object-cover rounded-xl"
                                            width={300}
                                            height={200}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    ) : (

                        <p className="italic mt-4 mb-8">Você não fez upload de nenhuma imagem ainda...</p>
                    )
                }

            </div>
        </div>
    )
}