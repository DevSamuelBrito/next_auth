"use client";
import { User } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

interface PhotoProfiileProps {
    image?: string | null;
}

const PhotoProfile = ({ image }: PhotoProfiileProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [preview, setPreview] = useState<string | null>(image || null)

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;
        const formData = new FormData();

        formData.append("file", file)

        const res = await fetch("/api/user/photo", {
            method: "POST",
            body: formData,
        })
        const data = await res.json();

        if (res.ok) {
            toast.success("Imagem enviada com sucesso");
            setPreview(data.imageUrl)
        }
        else {
            toast.error("Error ao enviar a imagem");
            setPreview(null)
        }

    }

    return (
        <div>
            <input
                type="file"
                onChange={handleChange}
                accept="image/*"
                ref={inputRef}
                className="hidden"
            />
            <div
                className="w-24 h-24 rounded-full overflow-hidden bg-black flex items-center justify-center"
                onClick={() => inputRef.current?.click()}
            >
                {preview ? (
                    <Image
                        src={preview}
                        alt="User"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <User size={40} className="text-white" />
                )}
            </div>

        </div>
    );
}

export default PhotoProfile;