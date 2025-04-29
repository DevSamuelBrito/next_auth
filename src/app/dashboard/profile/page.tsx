import { User } from "lucide-react";

const Profile = () => {
    return (
        <div className="space-y-4 flex flex-col items-center justify-center 2xl:mx-24 mx-15 bg-[#171717] rounded-2xl mb-4 p-4">
            <div className="bg-black rounded-full w-24 h-24 flex items-center justify-center">
                <User size={40} className="text-white" />
            </div>
            <p>
                <span className="font-bold text-[#96938d] hover:text-white cursor-pointer mt-4">
                    Perfil
                </span>
            </p>
        </div>
    );
}

export default Profile;
