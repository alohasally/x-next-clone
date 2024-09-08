import NextAuth from "next-auth/next";

import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();
      session.user.uid = token.sub;
      return session;
    },
  },
  // callbacks: {
  //     async jwt(token, user, account, profile, isNewUser) {
  //         if (user) {
  //             token.id = user.id;
  //             token.name = user.name;
  //             token.email = user.email;
  //         }
  //         return token;
  //     },
  // },
});

export { handler as GET, handler as POST };
