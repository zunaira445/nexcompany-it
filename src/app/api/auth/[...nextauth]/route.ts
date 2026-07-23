import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        const existing = await User.findOne({ email: user.email });

        if (!existing) {
          await User.create({
            fullName: user.name || "Google User",
            email: user.email,
            googleId: account.providerAccountId,
            role: "user",
            isVerified: true,
          });
        } else if (!existing.googleId) {
          existing.googleId = account.providerAccountId;
          existing.isVerified = true;
          await existing.save();
        }
      }
      return true;
    },
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };