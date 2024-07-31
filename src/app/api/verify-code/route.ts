import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { date } from "zod";

export async function POST(request: Request) {
    await dbConnect()

    try {

        console.log("in verify route")
        const { username, code } = await request.json()
        console.log(username)
        console.log(code)
        const decodedUsername = decodeURIComponent(username)
        console.log(decodedUsername)

        const user = await UserModel.findOne({ username: decodedUsername })

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 500 })
        }

        const isvalidCode = user.verificationToken === code
        const isCodeNotExpired = new Date(user.verificationTokenExpiry) > new Date()

        if (isvalidCode && isCodeNotExpired) {
            user.isVerified = true
            await user.save()

            return Response.json({
                success: true,
                message: "Accound verified successfully"
            }, { status: 200 })
        } else if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                message: "Verification code is expired, Please signup again to get a new code"
            }, { status: 400 })
        } else {
            return Response.json({
                success: false,
                message: "Invalid verification code"
            }, {status:500})
        }

    } catch (error) {
        console.error("Faild verification", error)

        return Response.json({
            success: false,
            message: "Failed verfication"
        }, { status: 500 })
    }
}