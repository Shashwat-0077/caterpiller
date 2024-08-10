import { db } from "@/db/drizzle";
import { Comments } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

// import { generateText } from "ai";
// import { google } from "@ai-sdk/google";

import { GoogleGenerativeAI } from "@google/generative-ai";

const app = new Hono()
    .get("/summarize", async (c) => {
        const genAI = new GoogleGenerativeAI(
            process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
        );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const comments = await db.select().from(Comments);
        const prompt =
            "Summarize all of these comments and don't give any headings and bullet points just a normal plain text about how can i improve my services" +
            comments.map((val) => val.body).join("");

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);

        return c.json({ message: text });
    })
    .get("/", async (c) => {
        const comments = await db.select().from(Comments);
        const joinedComments = comments.map((val) => val.body).join(",");
        return c.json({ comments, joinedComments });
    })
    .post(
        "/",
        zValidator(
            "json",
            z
                .object({
                    title: z.string(),
                    body: z.string(),
                })
                .array(),
        ),
        async (c) => {
            const comments = c.req.valid("json");

            for (const comment of comments) {
                await db.insert(Comments).values(comment);
            }

            return c.json({ message: "" });
        },
    );

export default app;
