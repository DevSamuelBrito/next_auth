"use client"
import SearchInput from "@/components/search-input";
import { useState } from "react";
import PublicImagesList, { PublicImage } from "../components/PublicImageList";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";


const Search = () => {
    const [search, setSearch] = useState("");
    const [images, setImages] = useState<PublicImage[]>([]);

    const handleClear = () => {
        setSearch("");
        setImages([]);
        toast.success("Pesquisa limpa");
    }

    const handleSearch = async () => {
        try {
            const response = await fetch(`/api/search?query=${search}`)
            const data = await response.json()
            setImages(data.images);
            if (data.images.length === 0) {
                toast.error("Nenhuma imagem encontrada");
            } else {
                toast.success("Imagens encontradas com sucesso");
            }
        } catch (error) {
            toast.error("Erro ao pesquisar Imagem");
        }
    }

    return (
        <>
            <div className="w-full min-h-screen bg-neutral-950 px-4 py-8">
                <div className="max-w-5xl mx-auto flex flex-col gap-8">
                    <h1 className="text-2xl font-bold">Buscar por imagens...</h1>
                    <div className="flex items-center">
                        <div className="flex-1">
                            <SearchInput
                                onSearch={handleSearch}
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </div>
                        <Button onClick={handleClear} className="ml-4">
                            Limpar
                        </Button>
                    </div>


                    <div>
                        <PublicImagesList images={images} />
                    </div>
                </div>
            </div>

        </>
    );
}

export default Search;