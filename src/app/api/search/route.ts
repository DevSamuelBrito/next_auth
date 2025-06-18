import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  const images = await prisma.userImage.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      isPrivate: false,
    },
  });

  return NextResponse.json({ images });
}
