import { db } from "@/db/drizzle";
import { Parts } from "@/db/schema";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { unknown, z } from "zod";
import { HTTPException } from "hono/http-exception";
import { authMiddleWare } from "./utils/authMiddleware";
import { eq } from "drizzle-orm";

const app = new Hono()

    // Fetch all part records
    .get("/", async (c) => {
        const data = await db.select().from(Parts);
        return c.json({ data });
    })

    // Fetch a particular part by ID
    .get(
        "/:id",
        zValidator("param", z.object({ id: z.number() })),
        async (c) => {
            try {
                const { id } = c.req.valid("param");
                const data = await db
                    .select()
                    .from(Parts)
                    .where(eq(Parts.id, id))
                    .limit(1);

                if (data.length === 0) {
                    throw new HTTPException(404, { message: "Part not found" });
                }

                return c.json({ data: data[0] });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Fetch the part record",
                });
            }
        },
    )

    // Create a new part record
    .post(
        "/",
        authMiddleWare,
        zValidator(
            "json",
            z.object({
                name: z.string(),
                price: z.number().positive(),
                category: z.string(),
            }),
        ),
        async (c) => {
            try {
                const data = c.req.valid("json");

                await db.insert(Parts).values({
                    name: data.name,
                    price: data.price,
                    category: data.category,
                });

                return c.json({ message: "Part Record Created" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Create a new part record",
                });
            }
        },
    )

    // Update an existing part record
    .put(
        "/:id",
        authMiddleWare,
        zValidator(
            "param",
            z.object({
                id: z.number(),
            }),
        ),
        zValidator(
            "json",
            z.object({
                name: z.string().optional(),
                price: z.number().positive().optional(),
                category: z.string().optional(),
            }),
        ),
        async (c) => {
            try {
                const data = c.req.valid("json");
                const { id } = c.req.valid("param");

                await db
                    .update(Parts)
                    .set({
                        name: data.name,
                        price: data.price,
                        category: data.category,
                    })
                    .where(eq(Parts.id, id));

                return c.json({ message: "Part Record Updated" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Update the part record",
                });
            }
        },
    )

    // Delete an existing part record
    .delete(
        "/:id",
        authMiddleWare,
        zValidator("param", z.object({ id: z.number() })),
        async (c) => {
            try {
                const { id } = c.req.valid("param");

                await db.delete(Parts).where(eq(Parts.id, id));

                return c.json({ message: "Part Record Deleted" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Delete the part record",
                });
            }
        },
    )
    .post(
        "/bulk-insert",
        authMiddleWare,
        zValidator(
            "json",
            z.array(
                z.object({
                    name: z.string(),
                    price: z.number().positive(),
                    category: z.string(),
                }),
            ),
        ),
        async (c) => {
            try {
                const data = c.req.valid("json");

                await db.insert(Parts).values(data);

                return c.json({ message: "Parts Records Created" });
            } catch (error: any) {
                throw new HTTPException(500, {
                    message: "Cannot Create new parts records" + error.message,
                });
            }
        },
    );

export default app;
