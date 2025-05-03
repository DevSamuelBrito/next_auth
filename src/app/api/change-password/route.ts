import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  //aqui eu estou pegando a senha atual e a nova senha do corpo da requisição
  const { currentPassword, newPassword } = await request.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  if (!user || !user.password) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  //criando hash da nova senha
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  //atualizando a senha do usuário
  await prisma.user.update({
    where: { email: session?.user?.email },
    data: { password: hashedNewPassword },
  });

  return NextResponse.json(
    { messsage: "Password changed successfully" },
    { status: 200 }
  );
}
