"use client";
import { ForgetPasswordCard } from "./components/forgetPasswordCard";

const ForgetPassword = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <ForgetPasswordCard />
            </div>
        </div>
    );
}

export default ForgetPassword;