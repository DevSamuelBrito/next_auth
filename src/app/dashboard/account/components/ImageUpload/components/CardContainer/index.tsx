import { ImageData } from "@/types/imageData";
import { CardImagem } from "../../../CardComImagem";
import { toast } from "sonner";

interface CardContainerProps {
    img: {
        id: string;
        publicId: string;
        name: string;
        description: string;
        createAt: string
    };
    setImageUrl: React.Dispatch<React.SetStateAction<ImageData[]>>
    ;
}


export default function CardContainer({ img, setImageUrl }: CardContainerProps) {

    const DeleteImage = async () => {
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

    return (
        <div className="bg-[#292828] rounded-2xl border-[1px] border-gray flex flex-col items-center justify-center" key={img.id}>
            <CardImagem
                key={img.id}
                img={img}
                onDelete={DeleteImage}
            />
            <div className="flex flex-col items-center w-[200px] justify-center  overflow-hidden">
                <p className="font-bold  overflow-hidden whitespace-nowrap text-ellipsis w-full text-center">{img.name}</p>
                <p className="italic overflow-hidden whitespace-nowrap text-ellipsis w-full text-center">
                    {img.description}
                </p>
            </div>
        </div>
    )
}