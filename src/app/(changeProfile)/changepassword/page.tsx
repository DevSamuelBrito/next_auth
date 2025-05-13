"use client";

import { ChangePasswordCard } from "./components/ChangePasswordCard";


const ChangePassword = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <ChangePasswordCard />
            </div>
        </div>
    );
}

export default ChangePassword;