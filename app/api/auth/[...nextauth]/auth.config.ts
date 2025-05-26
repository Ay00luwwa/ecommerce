import type { AuthConfig } from "@auth/core"
import type { JWT } from "next-auth/jwt"
import type { Session } from "next-auth"
import type { User } from "@/db/schema"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook"
import bcrypt from "bcryptjs"
import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { eq } from "drizzle-orm"
import { users } from "@/db/schema"
import { db } from "@/db"

export default {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const validatedFields = LoginSchema.safeParse({
          email: credentials.email,
          password: credentials.password
        })

        if (!validatedFields.success) return null

        const { email, password } = validatedFields.data
        
        // Get user from database
        const user = await db.query.users.findFirst({
          where: eq(users.email, email)
        })

        if (!user || !user.password) return null

        // Verify password
        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (!passwordsMatch) return null

        return user
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    })
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.firstName = user.firstName
        token.lastName = user.lastName
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.firstName = token.firstName as string
        session.user.lastName = token.lastName as string
      }
      return session
    }
  }
} satisfies AuthConfig