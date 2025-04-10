"use client";

import { useEffect, useState } from "react";

export default function ImageUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string[]>([]); // mudando o useSte para um array de string
    const [loading, setLoading] = useState(false);



    useEffect(()=>{
        const fetchImages = async ()=>{
            const res = await fetch("/api/getImagesUser");
            const data = await res.json();
            setImageUrl(data.images);
        }

        fetchImages();
    },[])

    const handleUpload = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        if (!file) return;

        setLoading(true);

        const formData = new FormData();
        formData.append("file", file)

        const res = await fetch("/api/upload", { //sempre colocar / antes do nome da rota para nao dar problema
            method: "POST",
            body: formData,
        });
        
        const text = await res.text(); // Obtém a resposta como um text
        console.log("Resposta do servidor:", text);
        
        try {
            const data = JSON.parse(text); // aqui eu tento  converter para JSON
            setLoading(false);
            if (data.secure_url) {
                setImageUrl((prev) => [...prev, data.secure_url]);// aqui ele vai pegar o array anterior e vai adicionar a nova imagem.
            }
        } catch (error) {
            console.error("Erro ao converter JSON:", error);
        }
        setLoading(false);
    }

    return (
        <div>
            <form className="space-y-4" onSubmit={handleUpload}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <button 
                type="submit"
                 disabled={loading}
                 onClick={()=>{console.log("clicado")}} 
                className="bg-blue-500 text-white px-4 py-2 rounded">
                    {loading ? "Enviando..." : "Upload"}
                </button>
            </form>

            <div className="mt-4 grid grid-cols-3 gap-4">
                {
                    imageUrl.map((url,index)=>(
                        <img key={index} src={url} alt={`Upload ${index}`}  className="max-w-xs rounded"/>
                    ))
                }
            </div>
        </div>
    )
}