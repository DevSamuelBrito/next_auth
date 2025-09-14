
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SectionProfilePicture from "./components/SectionProfilePicture";
import SectionUserName from "./components/SectionUserName";
import SectionEmail from "./components/SectionEmail";
import SectionEditPassword from "./components/SectionEditPassword";
import ButtonDeleteAccount from "./components/ButtonDeleteAccount";
import SectionName from "./components/SectionUserName";
import SectionUsername from "./components/EditUsername";

const Profile = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user?.email as string },
        select: {
            name: true,
            profilePicture: true,
            email: true,
            username: true,
        }
    })

    if (!user) {
        redirect("/");
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center 2xl:mx-24 mx-16">
                {/* Fora da Div principal */}
                <p className="text-white font-semibold text-lg mb-2 self-start">Perfil</p>

                <div className="space-y-4 flex flex-col items-center justify-center bg-[#171717] rounded-2xl mb-4 p-4 w-full">

                    {/* Div da Foto de perfil*/}
                    <SectionProfilePicture user={user} />
                    <div className="w-full h-px bg-white/20 my-4" />

                    {/*Div do nome do usuário */}
                    <SectionName user={user} />
                    <div className="w-full h-px bg-white/20 my-4" />
                    <SectionUsername user={user} />

                    {/*Div do email */}
                    <div className="w-full h-px bg-white/20 my-4" />
                    <SectionEmail user={user} />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center 2xl:mx-24 mx-16">
                {/* Fora da Div principal */}
                <p className="text-white font-semibold text-lg mb-2 self-start">Segurança</p>
                <div className="space-y-4 flex flex-col items-center justify-center bg-[#171717] rounded-2xl mb-4 p-4 w-full">
                    {/*Div de senha  do usuário */}
                    <SectionEditPassword />
                </div>
            </div>
            <div className="2xl:mx-24 mx-16 mt-3">
                <ButtonDeleteAccount />
            </div>
        </div>
    );
}

export default Profile;

