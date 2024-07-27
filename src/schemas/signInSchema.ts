import {z} from 'zod';

export const signUpSchema = z.object({
    username: z.string(),
    email: z.string().email({message:"Invalid email address"}),
    password: z.string().min(8,{message:"Password must be atlease 8 characters"})
})