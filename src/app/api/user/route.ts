import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
    select: {
      id: true,
      name: true,
      email: true,
      profilePicture: true,
    },
  });

  if(!user ){
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}
