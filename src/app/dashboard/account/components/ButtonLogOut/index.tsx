"use client"

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const ButtonLogOut = () => {
    return (
        <Button variant="outline" className="mt-4 w-52" onClick={() => redirect("/dashboard")}>
            Voltar
        </Button>
    );
}

export default ButtonLogOut;