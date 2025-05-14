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
    return NextResponse.json({ error: "Usuário não autorizado" }, { status: 401 });
  }
  if (!session.user) {
    return NextResponse.json({ error: "Usuário não autorizado" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
  });

  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
  }

  if (!user.profilePicturePublicId) {
    return NextResponse.json({ error: "Nenhuma imagem de perfil para deletar" }, { status: 400 });
  }

  try {
    // Deleta do Cloudinary
    await cloudinary.uploader.destroy(user.profilePicturePublicId);

    // Limpa os campos no banco
    await prisma.user.update({
      where: { id: user.id },
      data: {
        profilePicture: null,
        profilePicturePublicId: null,
      },
    });

    return NextResponse.json(
      { message: "Imagem de perfil deletada com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar imagem:", error);
    return NextResponse.json(
      { error: "Erro ao deletar imagem de perfil" },
      { status: 500 }
    );
  }
}
