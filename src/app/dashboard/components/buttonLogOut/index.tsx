"use client";
import { signOut } from "next-auth/react";
export function ButtonLogOut() {


    return (
        <button
            className="bg-red-100 border-2 rounded-2xl font-bold px-2 py-2 w-20"
            onClick={()=>{
                signOut({ callbackUrl: '/' },
                )
            }}
        >Sair</button>
    );
}