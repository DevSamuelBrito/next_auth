
import PhotoProfile from "./components/PhotoProfile";
import EditNameSection from "./components/EditNameSection";
import EditPasswordSection from "./components/EditPasswordSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReloadButton } from "./components/ReloadPage";
import { prisma } from "@/lib/prisma";

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
        }

    })

    return (
        <div className="space-y-4 flex flex-col items-center justify-center 2xl:mx-24 mx-16 bg-[#171717] rounded-2xl mb-4 p-4">
            <PhotoProfile image={user?.profilePicture} />

            <div className="flex items-center gap-2 mt-4">
                <span className="font-bold text-[#96938d] hover:text-white cursor-pointer">
                    {user?.name || "Usuário"}
                </span>
                <ReloadButton />
            </div>

            <EditNameSection />
            <EditPasswordSection />
        </div>

    );
}

export default Profile;

