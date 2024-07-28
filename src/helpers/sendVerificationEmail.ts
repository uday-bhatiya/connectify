import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../emails/VerificationEmail";

export const sendVerificationEmail = async (
    email: string,
    username: string,
    verificationToken: string
): Promise<ApiResponse> => {
    try {
        
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Connectify verification code',
            react: VerificationEmail({username, otp:verificationToken}),
          });

        return {success: true, message: "Verification email send successfully"}
    } catch (error) {
        console.log("Error sending verification email", error)
        return {success: false, message: "Failed to send verification email"}
    }
}