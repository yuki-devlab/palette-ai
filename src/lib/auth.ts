import Google from "next-auth/providers/google";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id;

            return session;
        },
    },
    providers: [Google],
});