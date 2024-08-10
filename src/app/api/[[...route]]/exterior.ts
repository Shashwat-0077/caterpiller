import { db } from "@/db/drizzle";
import { exterior } from "@/db/schema";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";
import { authMiddleWare } from "./utils/authMiddleware";
import { eq } from "drizzle-orm";

// Import your enums

const app = new Hono()
    // Fetch all exterior records
    .get("/", async (c) => {
        const data = await db.select().from(exterior);
        return c.json({ data });
    })
    // Create a new exterior record
    .post(
        "/",
        authMiddleWare,
        zValidator(
            "json",
            z.object({
                inspectionID: z.number(),
                rustDentDamage: z.enum(["Y", "N"]), // YesNoEnum
                oilLeakSuspension: z.enum(["Y", "N"]), // YesNoEnum
                overallSummary: z.string(),
                images: z.array(z.string()).optional(),
            }),
        ),
        async (c) => {
            try {
                const data = c.req.valid("json");

                await db.insert(exterior).values({
                    inspectionID: data.inspectionID,
                    rustDentDamage: data.rustDentDamage,
                    oilLeakSuspension: data.oilLeakSuspension,
                    overallSummary: data.overallSummary,
                    images: data.images,
                });

                return c.json({ message: "Exterior Record Created" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Create a new exterior record",
                });
            }
        },
    )
    // Update an existing exterior record
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
                rustDentDamage: z.enum(["Y", "N"]).optional(), // YesNoEnum
                oilLeakSuspension: z.enum(["Y", "N"]).optional(), // YesNoEnum
                overallSummary: z.string().optional(),
                images: z.array(z.string()).optional(),
            }),
        ),
        async (c) => {
            try {
                const data = c.req.valid("json");
                const { id } = c.req.valid("param");

                await db
                    .update(exterior)
                    .set({
                        rustDentDamage: data.rustDentDamage,
                        oilLeakSuspension: data.oilLeakSuspension,
                        overallSummary: data.overallSummary,
                        images: data.images,
                    })
                    .where(eq(exterior.id, id));

                return c.json({ message: "Exterior Record Updated" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Update the exterior record",
                });
            }
        },
    )
    // Delete an existing exterior record
    .delete(
        "/:id",
        authMiddleWare,
        zValidator("param", z.object({ id: z.number() })),
        async (c) => {
            try {
                const { id } = c.req.valid("param");

                await db.delete(exterior).where(eq(exterior.id, id));

                return c.json({ message: "Exterior Record Deleted" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Delete the exterior record",
                });
            }
        },
    );

export default app;
