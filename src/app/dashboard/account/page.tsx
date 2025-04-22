import { authOptions } from "@/lib/auth";
import ImageUpload from "./components/ImageUpload";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Account = async () => {

    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/");
    }

    return (
        <div className="flex flex-col">         
            <ImageUpload />
        </div>
    );
}

export default Account;