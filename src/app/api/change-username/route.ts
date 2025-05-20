import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { username } = await request.json();

  if (!username) {
    return NextResponse.json({ error: "username is required" }, { status: 400 });
  }

  const existingUserName = await prisma.user.findUnique({
    where:{
        username: username
    }
  })
  if(existingUserName?.username === username){
    return NextResponse.json(
      { error: "Esse Username já possui a você" },
      { status: 400 }
    );
  }
  if (existingUserName) {
    return NextResponse.json(
      { error: "Username já existe" },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: {
      email: session?.user?.email,
    },
    data: {
      username: username,
    },
  });

  return NextResponse.json(
    { messsage: "Name changed successfully" },
    { status: 200 }
  );
}
