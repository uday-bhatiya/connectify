import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import UserModel from "@/models/user.model";
import dbConnect from "@/lib/dbConnect";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "cr,edentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials: any): Promise<any>{
                await dbConnect()

                try {

                    const user = await UserModel.findOne({email: credentials.identifier.email})
                    if (!user) {
                        throw new Error("User not found with this email")
                    }
                    if (!user.isVerified) {
                        throw new Error("Please verify your email before login")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if (isPasswordCorrect) {
                        return user
                    } else {
                        throw new Error("Incorrect password")
                    }
                    
                } catch (error: any) {
                    throw new Error(error)
                }
              }
        })
    ],
    callbacks: {
        async jwt({ token, user}) {

            if (user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.username = user.username
            }
            
          return token
        },
        async session({ session, token }) {

            if (token) {
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.username = token.username
            }

            return session
          }
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.AUTH_SECRET
}