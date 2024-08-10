import { db } from "@/db/drizzle";
import { engine } from "@/db/schema";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";
import { authMiddleWare } from "./utils/authMiddleware";
import { eq } from "drizzle-orm";

const app = new Hono()
    // Fetch all engine records
    .get("/", async (c) => {
        const data = await db.select().from(engine);
        return c.json({ data });
    })
    // Create a new engine record
    .post(
        "/",
        authMiddleWare,
        zValidator(
            "json",
            z.object({
                inspectionID: z.number(),
                rustDentDamage: z.enum(["Y", "N"]), // YesNoEnum
                oilCondition: z.enum(["Good", "Bad"]), // OilConditionEnum
                oilColor: z.enum(["Clean", "Brown", "Black"]), // OilColorEnum
                brakeFluidCondition: z.enum(["Good", "Bad"]), // OilConditionEnum
                brakeFluidColor: z.enum(["Clean", "Brown", "Black"]), // OilColorEnum
                oilLeak: z.enum(["Y", "N"]), // YesNoEnum
                overallSummary: z.string(),
                images: z.array(z.string()).optional(),
            }),
        ),
        async (c) => {
            try {
                const data = c.req.valid("json");

                await db.insert(engine).values({
                    inspectionID: data.inspectionID,
                    rustDentDamage: data.rustDentDamage,
                    oilCondition: data.oilCondition,
                    oilColor: data.oilColor,
                    brakeFluidCondition: data.brakeFluidCondition,
                    brakeFluidColor: data.brakeFluidColor,
                    oilLeak: data.oilLeak,
                    overallSummary: data.overallSummary,
                    images: data.images,
                });

                return c.json({ message: "Engine Record Created" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Create a new engine record",
                });
            }
        },
    )
    // Update an existing engine record
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
                oilCondition: z.enum(["Good", "Bad"]).optional(), // OilConditionEnum
                oilColor: z.enum(["Clean", "Brown", "Black"]).optional(), // OilColorEnum
                brakeFluidCondition: z.enum(["Good", "Bad"]).optional(), // OilConditionEnum
                brakeFluidColor: z.enum(["Clean", "Brown", "Black"]).optional(), // OilColorEnum
                oilLeak: z.enum(["Y", "N"]).optional(), // YesNoEnum
                overallSummary: z.string().optional(),
                images: z.array(z.string()).optional(),
            }),
        ),
        async (c) => {
            try {
                const data = c.req.valid("json");
                const { id } = c.req.valid("param");

                await db
                    .update(engine)
                    .set({
                        rustDentDamage: data.rustDentDamage,
                        oilCondition: data.oilCondition,
                        oilColor: data.oilColor,
                        brakeFluidCondition: data.brakeFluidCondition,
                        brakeFluidColor: data.brakeFluidColor,
                        oilLeak: data.oilLeak,
                        overallSummary: data.overallSummary,
                        images: data.images,
                    })
                    .where(eq(engine.id, id));

                return c.json({ message: "Engine Record Updated" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Update the engine record",
                });
            }
        },
    )
    // Delete an existing engine record
    .delete(
        "/:id",
        authMiddleWare,
        zValidator("param", z.object({ id: z.number() })),
        async (c) => {
            try {
                const { id } = c.req.valid("param");

                await db.delete(engine).where(eq(engine.id, id));

                return c.json({ message: "Engine Record Deleted" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Delete the engine record",
                });
            }
        },
    );

export default app;
