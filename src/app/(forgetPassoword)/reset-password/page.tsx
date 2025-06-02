"use client";

import { ResetPasswordCard } from "./components/ResetPasswordCard";
import { useSearchParams } from "next/navigation";

const ResetPasswordPage = () => {

    const searchParams = useSearchParams();
    const token = searchParams.get("token") as string;

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <ResetPasswordCard token={token} />
            </div>
        </div>
    );
}

export default ResetPasswordPage;