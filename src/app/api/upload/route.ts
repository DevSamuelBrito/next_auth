import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "User not authorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const tagsString = formData.get("tags") as string;
    const tags = JSON.parse(tagsString) as string[];

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadReponse = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "images" }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        })
        .end(buffer);
    });

    if (!uploadReponse.secure_url) {
      return NextResponse.json(
        { error: "Error uploading Image" },
        { status: 500 }
      );
    }

    const createdImage = await prisma.userImage.create({
      data: {
        secureUrl: uploadReponse.secure_url,
        publicId: uploadReponse.public_id,
        name,
        description,
        user: {
          connect: {
            email: session.user?.email as string,
          },
        },
      },
    });

    // Agora, cria ou conecta cada tag
    for (const tagName of tags) {
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });

      await prisma.userImageTags.create({
        data: {
          imageId: createdImage.id,
          tagId: tag.id,
        },
      });
    }

    return NextResponse.json({
      id: uploadReponse.public_id,
      secureUrl: uploadReponse.secure_url,
      publicId: uploadReponse.public_id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error uploading image" },
      { status: 500 }
    );
  }
}
