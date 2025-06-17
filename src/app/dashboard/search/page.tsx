"use client"
import SearchInput from "@/components/search-input";
import { useState } from "react";
import { PublicImage } from "../components/PublicImageList";
import { toast } from "sonner";


const Search = () => {
    const [seach,setSeatch] = useState("");
    const [images, setImages] = useState<PublicImage[]>([]);

    const handleSearch = async () => {
        try {
            
        } catch (error) {  
            toast.error("Erro ao pesquisar Imagem");
        }
    }

    return (
        <>
            <div className="w-full flex items-center bg-red-900 justify-center">
                <div className="w-full max-w-xl">
                {/* <SearchInput  onSearch={handleSearch}/> */}
                </div>
            </div>
        </>
    );
}

export default Search;