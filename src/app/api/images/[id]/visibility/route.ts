import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//metodo para buscar a imagem e devolver o status de visibilidade
export async function GET(
  req: Request,
  context : { params: Promise<{ id: string }> }
) {
  const params = await context.params;
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
  return NextResponse.json({isPrivate: image.isPrivate }, { status: 200 });
}

//metodo para atualizar a visibilidade da imagem
export async function PATCH(
  req: Request,
  context : { params: Promise<{ id: string }> }
) {
  const params = await context.params;
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

  return NextResponse.json({isPrivate: updateImage.isPrivate} , { status: 200 });
}
