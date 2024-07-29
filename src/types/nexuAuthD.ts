import 'next-auth';
import {DefaultSession} from 'next-auth'
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string
  }
}

declare module 'next-auth' {
    interface User {
        _id?: string,
        isVerified?: boolean,
        username?: string
    }
    interface Session {
        user: {
            _id?: string,
            isVerified?: boolean,
            username?: string
        } & DefaultSession['user']
    } 
}

declare module "next-auth/jwt" {
    interface JWT {
        _id?: string,
        isVerified?: boolean,
        username?: string
    }
  }