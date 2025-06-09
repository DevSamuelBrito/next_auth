"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getSession } from "next-auth/react";
import { Input } from "@/components/ui/input"
import { ImageData } from "@/types/imageData";
import CardContainer from "./components/CardContainer";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import UserGallery from "./components/UserGallery";


export default function ImageUpload() {

    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [descriptionImage, setDescriptionImage] = useState<string>("");
    const [uploadError, setUploadError] = useState(false);
    const [session, setSession] = useState<any>(null);
    const [nameImage, setNameImage] = useState<string>("");
    const [tagsImage, setTagsImage] = useState<string[]>(["Natureza", "Cidade"]);
    const [privateImage, setPrivateImage] = useState<boolean>(false);

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
            console.log("Imagens do usuário:", data.images);
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
        formData.append("name", nameImage)
        formData.append("description", descriptionImage)
        formData.append("tags", JSON.stringify(tagsImage))
        formData.append("private", JSON.stringify(privateImage));

        const res = await fetch("/api/upload", { //sempre colocar / antes do nome da rota para nao dar problema
            method: "POST",
            body: formData,
        });

        const text = await res.text(); // Obtém a resposta como um text
        setUploadError(false);

        try {

            if (!file || nameImage.trim() === "" || descriptionImage.trim() === "") {
                setUploadError(true);
                toast.error("Por favor, preencha todos os campos obrigatórios.");
                setLoading(false);
                return;
            }

            const data = JSON.parse(text); // aqui eu tento  converter para JSON
            if (data.secureUrl && data.publicId) {
                setImageUrl(prev => [
                    ...prev,
                    {
                        id: data.id,
                        secureUrl: data.secureUrl,
                        publicId: data.publicId,
                        name: data.name,
                        description: data.description,
                        isPrivate: data.isPrivate,
                        createAt: data.createAt
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
            setNameImage("");
            setFile(null);
            setPrivateImage(false);
            setDescriptionImage("");
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

                    <div className="flex flex-col p-5 items-center justify-center w-full ">
                        <div className="mt-4 flex flex-col items-center w-1/2  ">
                            <p className="text-base text-gray-400 mb-2">Preview:</p>
                            <Image
                                src={preview}
                                alt="Preview da imagem selecionada"
                                width={300}
                                height={200}
                                className="rounded-xl object-cover max-w-32 max-h-32 lg:max-h-64 lg:max-w-64"
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
                        <div className="mt-4 flex flex-col w-1/2 gap-3 items-center">
                            <Input
                                id="name"
                                type="text"
                                value={nameImage}
                                placeholder="Nome da Imagem"
                                required
                                disabled={loading}
                                onChange={(e) => { setNameImage(e.target.value) }}
                            />
                            <Textarea
                                id="description"
                                value={descriptionImage}
                                placeholder="Descrição da Imagem"
                                className="h-24 w-full text-start align-top py-2"
                                disabled={loading}
                                required
                                onChange={(e) => { setDescriptionImage(e.target.value) }}
                            />
                            <div className="flex items-center gap-2">
                                <Switch
                                    id="Privado"
                                    checked={privateImage}
                                    onCheckedChange={(checked) => {
                                        setPrivateImage(checked);
                                    }}
                                />
                                <Label htmlFor="Privado">{privateImage ? "Imagem Privada" : "Imagem Publica"}</Label>
                            </div>
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

            <UserGallery imageUrl={imageUrl} session={session} setImageUrl={setImageUrl} />
        </div>
    )
}