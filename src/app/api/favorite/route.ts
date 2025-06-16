import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { imageId } = await req.json();

  if (!imageId)
    return NextResponse.json({ error: "imageId is required" }, { status: 400 });

  if (!session.user?.email)
    return NextResponse.json(
      { error: "User email is required" },
      { status: 400 }
    );

  try {
    const favorite = await prisma.favoriteImage.create({
      data: {
        userEmail: session.user?.email,
        imageId,
      },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar status" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { imageId } = await req.json();

  if (!imageId)
    return NextResponse.json({ error: "imageId is required" }, { status: 400 });

  if (!session.user?.email)
    return NextResponse.json(
      { error: "User email is required" },
      { status: 400 }
    );

  try {
    await prisma.favoriteImage.delete({
      where: {
        userEmail_imageId: {
          userEmail: session.user?.email!,
          imageId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar status" },
      { status: 500 }
    );
  }
}
