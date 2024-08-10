import { Hono } from "hono";
import { encodeBase64 } from "hono/utils/encode";
import { v2 as cloudinary } from "cloudinary";

const app = new Hono().post(
    "/",
    async (c, next) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        await next();
    },
    async (c) => {
        // TODO : Compress the file
        const body = await c.req.parseBody();
        console.log("Uploading...");

        const image = body.image as File;
        const byteArrayBuffer = await image.arrayBuffer();
        const base64 = encodeBase64(byteArrayBuffer);

        console.log("!Encoded");

        const results = await cloudinary.uploader.upload(
            `data:image/png;base64,${base64}`,
        );

        console.log(results);

        return c.json({ results });
    },
);

export default app;
