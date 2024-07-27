import mongoose, {Schema, Document} from "mongoose";

export interface User extends Document {
    fullName: string,
    username: string,
    email: string,
    password: string,
    avatar: string,
    isVerified: boolean,
    verificationToken: string,
    verificationTokenExpiry: Date,
    isAdmin: boolean,
    forgotPasswordToken: string,
    forgotPasswordTokenExpiry: Date,
}

const userSchema: Schema<User> = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    avatar: {
        type: String, // URL
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiry: {
        type: Date,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema)
export default UserModel;