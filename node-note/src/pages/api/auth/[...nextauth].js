import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: "1050035043417-182o70s3jgt7g8ni6t0d6phbm6ttviob.apps.googleusercontent.com",
      clientSecret: "CbtVlalmfD_7KNcvLgeA9au4NYX8",
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)