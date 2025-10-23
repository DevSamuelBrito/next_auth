"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getSession } from "next-auth/react";
import { ImageData } from "@/types/imageData";
import UserGallery from "./components/UserGallery";
import FormUploadImage from "./components/FormUploadImage";


export default function ImageUpload() {

    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingImages, setLoadingImages] = useState(true);
    const [preview, setPreview] = useState<string | null>(null);
    const [descriptionImage, setDescriptionImage] = useState<string>("");
    const [uploadError, setUploadError] = useState(false);
    const [session, setSession] = useState<any>(null);
    const [nameImage, setNameImage] = useState<string>("");
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
            setLoadingImages(false);
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        setUploadError(false);

        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
        } else {
            setPreview(null);
        }
    };


    return (
        <div>
            <FormUploadImage
                onFileChange={handleFileChange}
                onFileUpload={handleUpload}
                preview={preview}
                setPreview={setPreview}
                loading={loading}
                uploadError={uploadError}
                setFile={setFile}
                nameImage={nameImage}
                setNameImage={setNameImage}
                descriptionImage={descriptionImage}
                setDescriptionImage={setDescriptionImage}
                privateImage={privateImage}
                setPrivateImage={setPrivateImage}
            />
            <UserGallery imageUrl={imageUrl} session={session} setImageUrl={setImageUrl} loadingImage={loadingImages} />
        </div>
    )
}