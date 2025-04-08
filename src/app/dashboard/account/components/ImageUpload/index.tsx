"use client";

import { useState } from "react";

export default function ImageUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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
                setImageUrl(data.secure_url);
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
                {
                    imageUrl && (
                        <div className="mt-4">
                            <p>Imagem Enviada: <img src={imageUrl} alt="Upload" className="max-w-xs rounded" /> </p>
                        </div>
                    )
                }
            </form>
        </div>
    )
}