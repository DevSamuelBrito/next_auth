"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CardImagem } from "../CardComImagem";
import { getSession } from "next-auth/react";
import { Input } from "@/components/ui/input"


type ImageData = {
    id: string,
    secureUrl: string,
    publicId: string,
}


export default function ImageUpload() {

    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<ImageData[]>([]); // mudando o useSte para um array de string
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [descriptionImage, setDescriptionImage] = useState<string>("");
    const [uploadError, setUploadError] = useState(false);
    const [session, setSession] = useState<any>(null);
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            setSession(session);
        };

        const fetchImages = async () => {
            const res = await fetch("/api/getImagesUser", {
                method: "GET",
                cache: "no-store",
            });
            const data = await res.json();
            setImageUrl(data.images);
        };

        fetchSession();
        fetchImages();
    }, []);

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        }
    }, [preview]);

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
            if (data.secureUrl && data.publicId) {
                setImageUrl(prev => [
                    ...prev,
                    {
                        id: data.id,
                        secureUrl: data.secureUrl,
                        publicId: data.publicId,
                    },
                ]);// aqui ele vai pegar o array anterior e vai adicionar a nova imagem.
                toast.success("Imagem enviada com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao converter JSON:", error);
            toast.error("Erro ao fazer upload da imagem.");
        } finally {
            setLoading(false);
            setPreview(null);
        }
    }

    return (
        <div>
            <form
                className="space-y-4 flex flex-col items-center justify-center 2xl:mx-24 mx-15 bg-[#171717] rounded-2xl mb-4"
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

                    <div className="flex justify-between w-10/12 lg:w-8/12 p-5 max-h-96  ">
                        <div className="mt-4 flex flex-col items-center w-1/2  ">
                            <p className="text-base text-gray-400 mb-2">Preview:</p>
                            <Image
                                src={preview}
                                alt="Preview da imagem selecionada"
                                width={300}
                                height={200}
                                className="rounded-xl object-cover max-h-32 max-w-32 lg:max-w-64 lg:max-h-64"
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
                        <div className="mt-4 flex flex-col w-1/2 gap-3">
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                placeholder="Nome da Imagem"
                                required
                                onChange={(e) => { setName(e.target.value) }}
                            />
                            <Textarea
                                id="description"
                                value={descriptionImage}
                                placeholder="Descrição da Imagem"
                                className="h-24 text-start align-top py-2" 
                                required
                                onChange={(e) => { setDescriptionImage(e.target.value) }}
                            />
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                placeholder="Tags da Imagem"
                                required
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </div>
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

            <div className="flex flex-col items-center justify-center 2xl:mx-24 mx-15 bg-[#171717] rounded-2xl">
                <div className="flex items-start mt-4 w-11/12">
                    <p className="text-start text-[#96938d] hover:text-white">
                        {session?.user?.name ? `Galeria de ${session.user.name}:` : "Sua Galeria:"}
                    </p>
                </div>
                {
                    imageUrl.length > 0 ? (
                        <div className="mt-4 grid grid-cols-3 gap-4 mb-4">
                            {
                                imageUrl.map((img) => (
                                    <CardImagem
                                        key={img.id}
                                        img={img}
                                        onDelete={
                                            async () => {
                                                const res = await fetch("/api/deleteImage", {
                                                    method: "DELETE",
                                                    body: JSON.stringify({ publicId: img.publicId }),
                                                    headers: { "Content-Type": "application/json" },
                                                });
                                                if (res.ok) {
                                                    toast.success("Imagem excluída com sucesso!");

                                                    setImageUrl((prev) => prev.filter((image) => image.publicId !== img.publicId));
                                                } else {
                                                    toast.error("Erro ao excluir imagem");
                                                }
                                            }
                                        }
                                    />

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