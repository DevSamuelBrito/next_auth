import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "User not authorized" }, { status: 401 });
  }

  const formData = await request.formData();

  const file = formData.get("file") as File;
  //le o arquivo
  const bytes = await file.arrayBuffer();

  //converte para buffer (arquivo que o nodejs entende)
  const buffer = Buffer.from(bytes);

  //Transforma em base64 e monta o Data URI (obrigatório para upload via string)
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  //ai sim pode fazer o upload para a cloudinary
  const upload = await cloudinary.uploader.upload(base64, {
    folder: "profileImages",
  });

  const imageUrl = upload.secure_url;

  await prisma.user.update({
    where: { email: session.user.email },
    data: { profilePicture: imageUrl },
  });
  return NextResponse.json({ imageUrl }, { status: 200 });
}
