"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PhotoProfile from "./components/PhotoProfile";
import EditNameSection from "./components/EditNameSection";
import EditPasswordSection from "./components/EditPasswordSection";

const Profile = () => {
    const [loading, setLoading] = useState(false);

    if (loading) {
        console.log("Loading...");
    }


    return (
        <div className="space-y-4 flex flex-col items-center justify-center 2xl:mx-24 mx-16 bg-[#171717] rounded-2xl mb-4 p-4">
            <PhotoProfile />
            <p>
                <span className="font-bold text-[#96938d] hover:text-white cursor-pointer mt-4">
                    Samuel
                </span>
            </p>
            <EditNameSection />
            <EditPasswordSection />
        </div >
    );
}

export default Profile;

