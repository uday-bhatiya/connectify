import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();

    try {

        const {username, email, password} = await request.json()

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: true,
                message: "username is already taken"
            }, {status: 400})
        }

        const existingUserByEmail = await UserModel.findOne({email})

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {

                return Response.json({
                    success: false,
                    message: "User already exist with this email"
                },{status: 400})
                
            } else {

                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verificationToken = verifyCode;
                existingUserByEmail.verificationTokenExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save()
            }

        } else {
            const hashedPassword = await bcrypt.hash(password,10)
            const expiryData = new Date()
            expiryData.setHours(expiryData.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verificationToken: verifyCode,
                verificationTokenExpiry: expiryData,
                isVerified: false,
                isAdmin: false,
            })
            await newUser.save()
        }

        // Send email for verification

        const emailResponse = await sendVerificationEmail(email, username, verifyCode)

        if (!emailResponse) {
            return Response.json({
                success: false,
                message: emailResponse
            }, {status: 401})
        }

        return Response.json({
            success: true,
            message:"User registered successfully, Please verify your email"
        },{status: 201})
        
    } catch (error) {
        console.log("User registrestion failed", error);
        return Response.json({
            success: true,
            message: "Error user registretion"
        }, {status: 500})
    }
}