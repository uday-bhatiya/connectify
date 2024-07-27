import {z} from 'zod';

export const usernameValidation = z
    .string()
    .min(4,"Username must be atleast 4 characters")
    .max(8,"Username must be not more then 8 characters")
    .regex(/^[a-zA-Z0-9_]/, "Username must not contain special characters");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:"Invalid email address"}),
    password: z.string().min(8,{message:"Password must be atlease 8 characters"})
})