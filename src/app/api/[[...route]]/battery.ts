import { db } from "@/db/drizzle";
import { battery } from "@/db/schema";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";
import { authMiddleWare } from "./utils/authMiddleware";
import { eq } from "drizzle-orm";

const app = new Hono()
    // Fetch all battery records
    .get("/", async (c) => {
        const data = await db.select().from(battery);
        return c.json({ data });
    })
    // Create a new battery record
    .post(
        "/",
        authMiddleWare,
        zValidator(
            "json",
            z.object({
                inspectionID: z.number(),
                make: z.string(),
                replacementDate: z.string(), // Expecting ISO date string
                voltage: z.number(),
                waterLevel: z.enum(["Good", "Ok", "Low"]), // Adjust based on FluidLevelEnum
                condition: z.enum(["Y", "N"]),
                leakRust: z.enum(["Y", "N"]),
                overallSummary: z.string(),
                images: z.array(z.string()).optional(),
            }),
        ),
        async (c) => {
            try {
                const data = c.req.valid("json");

                await db.insert(battery).values({
                    inspectionID: data.inspectionID,
                    make: data.make,
                    replacementDate: data.replacementDate,
                    voltage: data.voltage,
                    waterLevel: data.waterLevel,
                    condition: data.condition,
                    leakRust: data.leakRust,
                    overallSummary: data.overallSummary,
                    images: data.images,
                });

                return c.json({ message: "Battery Record Created" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Create a new battery record",
                });
            }
        },
    )
    // Update an existing battery record
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
                make: z.string().optional(),
                replacementDate: z.string().optional(), // Expecting ISO date string
                voltage: z.number().optional(),
                waterLevel: z.enum(["Good", "Ok", "Low"]).optional(),
                condition: z.enum(["Y", "N"]).optional(),
                leakRust: z.enum(["Y", "N"]).optional(),
                overallSummary: z.string().optional(),
                images: z.array(z.string()).optional(),
            }),
        ),
        async (c) => {
            try {
                const data = c.req.valid("json");
                const { id } = c.req.valid("param");

                await db
                    .update(battery)
                    .set({
                        make: data.make,
                        replacementDate: data.replacementDate,
                        voltage: data.voltage,
                        waterLevel: data.waterLevel,
                        condition: data.condition,
                        leakRust: data.leakRust,
                        overallSummary: data.overallSummary,
                        images: data.images,
                    })
                    .where(eq(battery.id, id));

                return c.json({ message: "Battery Record Updated" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Update the battery record",
                });
            }
        },
    )
    // Delete an existing battery record
    .delete(
        "/:id",
        authMiddleWare,
        zValidator("param", z.object({ id: z.number() })),
        async (c) => {
            try {
                const { id } = c.req.valid("param");

                await db.delete(battery).where(eq(battery.id, id));

                return c.json({ message: "Battery Record Deleted" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Delete the battery record",
                });
            }
        },
    );

export default app;
