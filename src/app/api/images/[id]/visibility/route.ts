import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//metodo para buscar a imagem e devolver o status de visibilidade
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const image = await prisma.userImage.findUnique({
    where: {
      id: id,
    },
    select: {
      isPrivate: true,
    },
  });

  if (!image) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
  return NextResponse.json({ image: image.isPrivate }, { status: 200 });
}

//metodo para atualizar a visibilidade da imagem
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const image = await prisma.userImage.findUnique({
    where: {
      id: id,
    },
    select: {
      isPrivate: true,
    },
  });

  if (!image) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  const updateImage = await prisma.userImage.update({
    where:{
        id
    },
    data:{
        isPrivate: !image.isPrivate
    },
    select:{
        isPrivate: true,
    }
  })

  return NextResponse.json({ image: updateImage.isPrivate }, { status: 200 });
}
