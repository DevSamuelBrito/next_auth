import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

const users = [
  {
    id: "1",
    name: "Samuel",
    email: "teste@email.com",
    password: "123456", // Em produção, use hash de senha (bcrypt)
  },
  {
    id: "2",
    name: "Jenni",
    email: "jenni@email.com",
    password: "789456", // Em produção, use hash de senha (bcrypt)
  },
  {
    id: "3",
    name: "Eu",
    email: "eu@email.com",
    password: "samuel", // Em produção, use hash de senha (bcrypt)
  },
];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "senha", type: "password", placeholder: "Senha" },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios!");
        }
        const user = users.find((u) => u.email === credentials.email);

        if (!user || user.password !== credentials.password) {
          throw new Error("Credenciais inválidas");
        }
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
