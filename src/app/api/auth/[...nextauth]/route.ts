import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";


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

        const {default: bcrypt} = await import("bcrypt");
        
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("Credenciais inválidas");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if(!isPasswordValid){
          throw new Error("Credenciais Inválidas");
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
