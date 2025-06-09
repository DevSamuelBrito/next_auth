import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface FormUploadImageProps {
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileUpload: (e: React.FormEvent<HTMLFormElement>) => void;
    preview: string | null;
    setPreview: React.Dispatch<React.SetStateAction<string | null>>;
    loading: boolean;
    uploadError: boolean;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    nameImage: string;
    setNameImage: React.Dispatch<React.SetStateAction<string>>;
    descriptionImage: string;
    setDescriptionImage: React.Dispatch<React.SetStateAction<string>>;
    privateImage: boolean;
    setPrivateImage: React.Dispatch<React.SetStateAction<boolean>>
}


const FormUploadImage = ({ onFileChange, onFileUpload, preview, setPreview, loading, uploadError, setFile, nameImage, setNameImage, descriptionImage, setDescriptionImage, privateImage, setPrivateImage }: FormUploadImageProps) => {
    return (
        <form
            className="space-y-4 flex flex-col items-center justify-center 2xl:mx-24 mx-15 bg-[#171717] rounded-2xl mb-4"
            onSubmit={onFileUpload}
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
                onChange={onFileChange}
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
                            <Label>{privateImage ? "Imagem Privada" : "Imagem Publica"}</Label>
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
    );
}

export default FormUploadImage;