"use client";

import { ChangeNameCard } from "./components/ChangeNameCard";

const ChangeName = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <ChangeNameCard />
            </div>
        </div>
    );
}

export default ChangeName;