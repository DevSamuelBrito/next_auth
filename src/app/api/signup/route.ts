import { NextResponse } from "next/server";
import bcript from "bcrypt";
import { prisma } from "@/lib/prisma";

//nao pode ser export default
export async function POST(request: Request) {
  try {
    //aqui eu estou pegando o body da requisição
    const { name, email, password } = await request.json();

    //verificando se o email, nome e senha estão preenchidos
    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Preencha todos os campos" },
        { status: 400 }
      );
    }
    //verificando se o email ja existe no banco de dados
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Usuário já existe" }, { status: 400 });
    }

    const hashedPassword = await bcript.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Usuário criado com sucesso!", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log("Erro ao criar um novo usuário", error);
    return NextResponse.json(
      {
        error: "Erro ao criar um novo usuário",
      },
      { status: 500 }
    );
  }
}
