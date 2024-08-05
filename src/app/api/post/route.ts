import vine, { errors } from "@vinejs/vine";
import { CustomErrorReporter } from "@/validators/CustomErrorReporter";
import { postSchema } from "@/validators/postSchema";
import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import { imagevalidator } from '@/validators/imageValidator';
import { join } from "path";
import { writeFile } from "fs/promises";

import { getRandomNumber } from "@/lib/utils";
import PostModel from "@/models/post.model";
import dbConnect from "@/lib/dbConnect";

export async function GET(request: Response) {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ status: 401, message: "Un-Authorized" });
    }
}

export async function POST(request: Response) {
    await dbConnect();
    try {
        const session: CustomSession | null = await getServerSession(authOptions);
        if (!session) {
            return Response.json({ status: 401, message: "Un-Authorized" });
        }
        const formData = await request.formData();
        const data = {
            context: formData.get("context"),
            image: "",
        };
        vine.errorReporter = () => new CustomErrorReporter();
        const validator = vine.compile(postSchema);
        const payload = await validator.validate(data);

        const image = formData.get("image") as File | null;
        // * IF image exists
        if (image) {
            const isImageNotValid = imagevalidator(image?.name, image?.size);
            if (isImageNotValid) {
                return Response.json({
                    status: 400,
                    errors: {
                        context: isImageNotValid,
                    },
                });
            }

            // * Upload image if all good
            try {
                const buffer = Buffer.from(await image.arrayBuffer());
                const uploadDir = join(process.cwd(), "public", "/uploads");
                const uniqueName = Date.now() + "_" + getRandomNumber(1, 999999);
                const imgExt = image.name.split(".");
                const filename = uniqueName + "." + imgExt[1];
                await writeFile(`${uploadDir}/${filename}`, buffer);
                data.image = filename;
            } catch (error) {
                return Response.json({
                    status: 500,
                    message: "Something went wrong. Please try again later.",
                });
            }
        }

        // * create post in DB
        const post = new PostModel({
            context: payload.content,
            image: data.image || null,
        });
        await post.save();

        return Response.json({
            status: 200,
            message: "Post created successfully!",
        });
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return Response.json(
                { status: 400, errors: error.messages },
                { status: 200 }
            );
        }
    }
}
