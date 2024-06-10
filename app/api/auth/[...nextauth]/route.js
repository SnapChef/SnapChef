import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { username, email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ name: username });
          //check if usernames match
          if (!user) {
            return null;
          }
          //check if passwords match
          const passMatch = await bcrypt.compare(password, user.password);
          if (!passMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, id: user._id };
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      console.log("session: ", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
