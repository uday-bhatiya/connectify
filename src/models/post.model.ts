import mongoose, {Schema, Document} from "mongoose";
import { string } from "zod";

export interface Post extends Document {
    user: object,
    context: string,
    image: string
}

const postSchema: Schema<Post> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    context: {
        type: String,
    },
    image: {
        type: String
    }
})

const PostModel = (mongoose.models.Post as mongoose.Model<Post>) || mongoose.model<Post>("Post", postSchema)
export default PostModel;