import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Usuário não autorizado" },
      { status: 401 }
    );
  }
  if (!session.user) {
    return NextResponse.json(
      { error: "Usuário não autorizado" },
      { status: 401 }
    );
  }

  const email = session.user.email as string;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        images: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }
    for (const image of user?.images) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    await prisma.userImage.deleteMany({
      where: { userId: user.id },
    });

    if (user.profilePicturePublicId) {
      await cloudinary.uploader.destroy(user.profilePicturePublicId);
    }

    await prisma.user.delete({
      where: { id: user.id },
    });

    return NextResponse.json(
      { message: "Conta e imagens deletadas com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar conta:", error);
    return NextResponse.json(
      { error: "Erro interno ao deletar conta" },
      { status: 500 }
    );
  }
}
