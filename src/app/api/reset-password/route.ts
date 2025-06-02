import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
      include: { user: true },
    });

    if (!resetToken) {
      return NextResponse.json({ message: "Token inválido" }, { status: 400 });
    }

    if (resetToken.expiresAt < new Date()) {
      return NextResponse.json({ message: "Token expirado" }, { status: 400 });
    }

    //aqui vai ser o hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: resetToken.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    // Excluir o token após o uso
    await prisma.passwordResetToken.delete({
      where: {
        id: resetToken.id,
      },
    });

    return NextResponse.json({ message: "Senha atualizada com sucesso" });
    
  } catch (error) {
    console.error("Error in reset password API:", error);
    return NextResponse.json(
      { message: "Erro ao resetar a senha" },
      { status: 500 }
    );
  }
}
