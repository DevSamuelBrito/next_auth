import { SimpleUser } from "@/types/user";
import PhotoProfile from "../PhotoProfile";
import { Button } from "@/components/ui/button";

interface SectionProfilePictureProps {
    user: SimpleUser;
}

const SectionProfilePicture = ({ user }: SectionProfilePictureProps) => {
    return (
        <>
            <div className="flex items center justify-between w-full p-6">
                <div className="flex justify-center items-center gap-x-36">
                    <span className="text-[#96938d] text-sm font-bold w-28">Foto de perfil</span>
                    <PhotoProfile image={user?.profilePicture} />
                </div>
                <div className="flex items-center justify-center">
                    <Button className="cursor-pointer">
                        Alterar
                    </Button>
                </div>
            </div>
        </>
    );
}

export default SectionProfilePicture;