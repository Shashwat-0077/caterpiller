import { Context } from "hono";
import { auth } from "@/auth";
import { HTTPException } from "hono/http-exception";

export const authMiddleWare = async (c: Context, next: () => Promise<void>) => {
    const session = await auth();

    // if (!session?.user) {
    //     throw new HTTPException(401, {
    //         res: c.json({ error: "Unauthorized" }, 401),
    //     });
    // }
    // c.set("user", session.user);
    await next();
};
