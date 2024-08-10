import { db } from "@/db/drizzle";
import { brakes } from "@/db/schema";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";
import { authMiddleWare } from "./utils/authMiddleware";
import { eq } from "drizzle-orm";

// Import your enums

const app = new Hono()
    // Fetch all brakes records
    .get("/", async (c) => {
        const data = await db.select().from(brakes);
        return c.json({ data });
    })
    // Create a new brakes record
    .post(
        "/",
        authMiddleWare,
        zValidator(
            "json",
            z.object({
                inspectionID: z.number(),
                fluidLevel: z.enum(["Good", "Ok", "Low"]), // FluidLevelEnum
                frontCondition: z.enum(["Good", "Ok", "Needs Replacement"]), // ConditionEnum
                rearCondition: z.enum(["Good", "Ok", "Needs Replacement"]), // ConditionEnum
                emergencyBrakeCondition: z.enum(["Good", "Ok", "Low"]), // FluidLevelEnum
                overallSummary: z.string(),
                images: z.array(z.string()),
            }),
        ),
        async (c) => {
            try {
                const data = c.req.valid("json");

                await db.insert(brakes).values({
                    inspectionID: data.inspectionID,
                    fluidLevel: data.fluidLevel,
                    frontCondition: data.frontCondition,
                    rearCondition: data.rearCondition,
                    emergencyBrakeCondition: data.emergencyBrakeCondition,
                    overallSummary: data.overallSummary,
                    images: data.images,
                });

                return c.json({ message: "Brakes Record Created" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Create a new brakes record",
                });
            }
        },
    )
    // Update an existing brakes record
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
                fluidLevel: z.enum(["Good", "Ok", "Low"]).optional(), // FluidLevelEnum
                frontCondition: z
                    .enum(["Good", "Ok", "Needs Replacement"])
                    .optional(), // ConditionEnum
                rearCondition: z
                    .enum(["Good", "Ok", "Needs Replacement"])
                    .optional(), // ConditionEnum
                emergencyBrakeCondition: z
                    .enum(["Good", "Ok", "Low"])
                    .optional(), // FluidLevelEnum
                overallSummary: z.string().optional(),
                images: z.array(z.string()).optional(),
            }),
        ),
        async (c) => {
            try {
                const data = c.req.valid("json");
                const { id } = c.req.valid("param");

                await db
                    .update(brakes)
                    .set({
                        fluidLevel: data.fluidLevel,
                        frontCondition: data.frontCondition,
                        rearCondition: data.rearCondition,
                        emergencyBrakeCondition: data.emergencyBrakeCondition,
                        overallSummary: data.overallSummary,
                        images: data.images,
                    })
                    .where(eq(brakes.id, id));

                return c.json({ message: "Brakes Record Updated" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Update the brakes record",
                });
            }
        },
    )
    // Delete an existing brakes record
    .delete(
        "/:id",
        authMiddleWare,
        zValidator("param", z.object({ id: z.number() })),
        async (c) => {
            try {
                const { id } = c.req.valid("param");

                await db.delete(brakes).where(eq(brakes.id, id));

                return c.json({ message: "Brakes Record Deleted" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Delete the brakes record",
                });
            }
        },
    );

export default app;
