import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { username, password } = credentials;
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
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT:", token);
      if (user) {
        return { ...token, id: user.id, name: user.name };
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      console.log("Session:", session);
      return session;
    },
    async signIn({ user, account }) {
      const { name, email, image } = user;
      let username = name.replace(/\s/g, "");

      if (account.provider === "google") {
        try {
          await connectMongoDB();
          const existingUser = await User.findOne({ email: email });
          if (!existingUser) {
            const existingUsername = await User.findOne({ name: username });
            if (existingUsername) {
              username = `${username + Math.floor(Math.random() * 1000)}`;
            }
            const newUser = await User.create({
              name: username,
              email: email,
              pfpUrl: image,
            });
            user.id = newUser._id;
            user.name = newUser.name;
            return user;
          }
          user.id = existingUser._id;
          user.name = existingUser.name;
          return existingUser;
        } catch (error) {
          console.error("Sign-in error:", error);
          return false;
        }
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
