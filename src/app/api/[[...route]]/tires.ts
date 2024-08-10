import { db } from "@/db/drizzle";
import { tires } from "@/db/schema";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";
import { authMiddleWare } from "./utils/authMiddleware";
import { eq } from "drizzle-orm";

const app = new Hono()
    // Fetch all tire records
    .get("/", async (c) => {
        const data = await db.select().from(tires);
        return c.json({ data });
    })
    // Create a new tire record
    .post(
        "/",
        authMiddleWare,
        zValidator(
            "json",
            z.object({
                inspectionID: z.number(),
                leftFrontPressure: z.number(),
                rightFrontPressure: z.number(),
                leftFrontCondition: z.enum(["Good", "Ok", "Needs Replacement"]),
                rightFrontCondition: z.enum([
                    "Good",
                    "Ok",
                    "Needs Replacement",
                ]),
                leftRearPressure: z.number(),
                rightRearPressure: z.number(),
                leftRearCondition: z.enum(["Good", "Ok", "Needs Replacement"]),
                rightRearCondition: z.enum(["Good", "Ok", "Needs Replacement"]),
                overallSummary: z.string(),
                images: z.array(z.string()),
            }),
        ),
        async (c) => {
            try {
                const data = c.req.valid("json");

                await db.insert(tires).values({
                    inspectionID: data.inspectionID,
                    leftFrontPressure: data.leftFrontPressure,
                    rightFrontPressure: data.rightFrontPressure,
                    leftFrontCondition: data.leftFrontCondition,
                    rightFrontCondition: data.rightFrontCondition,
                    leftRearPressure: data.leftRearPressure,
                    rightRearPressure: data.rightRearPressure,
                    leftRearCondition: data.leftRearCondition,
                    rightRearCondition: data.rightRearCondition,
                    overallSummary: data.overallSummary,
                    images: data.images,
                });

                return c.json({ message: "Tire Record Created" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Create a new tire record",
                });
            }
        },
    )
    // Update an existing tire record
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
                leftFrontPressure: z.number().optional(),
                rightFrontPressure: z.number().optional(),
                leftFrontCondition: z
                    .enum(["Good", "Ok", "Needs Replacement"])
                    .optional(),
                rightFrontCondition: z
                    .enum(["Good", "Ok", "Needs Replacement"])
                    .optional(),
                leftRearPressure: z.number().optional(),
                rightRearPressure: z.number().optional(),
                leftRearCondition: z
                    .enum(["Good", "Ok", "Needs Replacement"])
                    .optional(),
                rightRearCondition: z
                    .enum(["Good", "Ok", "Needs Replacement"])
                    .optional(),
                overallSummary: z.string().optional(),
                images: z.array(z.string()).optional(),
            }),
        ),
        async (c) => {
            try {
                const data = c.req.valid("json");
                const { id } = c.req.valid("param");

                await db
                    .update(tires)
                    .set({
                        leftFrontPressure: data.leftFrontPressure,
                        rightFrontPressure: data.rightFrontPressure,
                        leftFrontCondition: data.leftFrontCondition,
                        rightFrontCondition: data.rightFrontCondition,
                        leftRearPressure: data.leftRearPressure,
                        rightRearPressure: data.rightRearPressure,
                        leftRearCondition: data.leftRearCondition,
                        rightRearCondition: data.rightRearCondition,
                        overallSummary: data.overallSummary,
                        images: data.images,
                    })
                    .where(eq(tires.id, id));

                return c.json({ message: "Tire Record Updated" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Update the tire record",
                });
            }
        },
    )
    // Delete an existing tire record
    .delete(
        "/:id",
        authMiddleWare,
        zValidator("param", z.object({ id: z.number() })),
        async (c) => {
            try {
                const { id } = c.req.valid("param");

                await db.delete(tires).where(eq(tires.id, id));

                return c.json({ message: "Tire Record Deleted" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Delete the tire record",
                });
            }
        },
    );

export default app;
