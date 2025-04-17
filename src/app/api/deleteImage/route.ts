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
    return NextResponse.json({ error: "User not authorized" }, { status: 401 });
  }

  const { publicId } = await req.json();

  if (!publicId) {
    return NextResponse.json(
      { error: "No publicId provided" },
      { status: 400 }
    );
  }

  try {
    // First find the image by publicId
    const image = await prisma.userImage.findFirst({
      where: { publicId },
    });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
    await cloudinary.uploader.destroy(publicId);

    await prisma.userImage.delete({
      where: { id: image.id },
    });

    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting Image" },
      { status: 500 }
    );
  }
}
