import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email é obrigatório" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // Define a expiração para 1 hora a partir de agora

    //exclusao de token antigos
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    const newToken = crypto.randomUUID(); // aqui eu gero um token único

    await prisma.passwordResetToken.create({
      data: {
        token: newToken,
        userId: user.id,
        expiresAt: expires,
      },
    });

    await resend.emails.send({
      to: user.email,
      from: "Acme <onboarding@resend.dev>",
      subject: "Recupere sua senha",
      html: `<p>Clique <a href="http://localhost:3000/reset-password?token=${newToken}">aqui</a> para resetar sua senha.</p>`,
    });

    return NextResponse.json({ message: "Email enviado" });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao processar a solicitação" },
      { status: 500 }
    );
  }
}
