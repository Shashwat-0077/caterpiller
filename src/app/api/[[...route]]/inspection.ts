import { z } from "zod";
import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { and, eq } from "drizzle-orm";
import { inspection } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { authMiddleWare } from "./utils/authMiddleware";

type Variables = {
    user: {
        id: string;
        name: string;
        email: string;
        emailVerified: Date;
        image: string;
    };
};

const app = new Hono<{ Variables: Variables }>()
    .get("/", async (c) => {
        const data = await db.select().from(inspection);
        return c.json({ data });
    })
    .post(
        "/",
        authMiddleWare,
        zValidator(
            "json",
            z.object({
                truckSerialNumber: z.string(),
                truckModel: z.string(),
                location: z.string(),
                lat: z.number(),
                long: z.number(),
                meterHours: z.number(),
                customerName: z.string(),
                catCusID: z.string(),
            }),
        ),
        async (c) => {
            try {
                const user = c.get("user");
                const data = c.req.valid("json");

                const date = new Date();
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
                const year = date.getFullYear();

                const formattedDate = `${day}-${month}-${year}`;

                const [entry] = await db
                    .insert(inspection)
                    .values({
                        catCusID: data.catCusID,
                        customerName: data.customerName,
                        date: formattedDate,
                        empID: user.id,
                        inspectorName: user.name,
                        location: data.location,
                        lat: data.lat,
                        long: data.long,
                        truckModel: data.truckModel,
                        truckSerialNumber: data.truckSerialNumber,
                        meterHours: data.meterHours,
                    })
                    .returning({ id: inspection.id });

                return c.json({ message: "Inspection Created", id: entry.id });
            } catch (error: any) {
                throw new HTTPException(500, {
                    message: "Cannot Create a new inspection " + error.message,
                });
            }
        },
    )
    .put(
        "/:id",
        authMiddleWare,
        zValidator(
            "json",
            z.object({
                id: z.number(),
                truckSerialNumber: z.string().optional(),
                truckModel: z.string().optional(),
                location: z.string().optional(),
                lat: z.number().optional(),
                long: z.number().optional(),
                meterHours: z.number().optional(),
                customerName: z.string().optional(),
                catCusID: z.string().optional(),
            }),
        ),
        async (c) => {
            try {
                const user = c.get("user");
                const data = c.req.valid("json");

                await db
                    .update(inspection)
                    .set({
                        meterHours: data.meterHours,
                        customerName: data.customerName,
                        location: data.location,
                        lat: data.lat,
                        long: data.long,
                        truckModel: data.truckModel,
                        truckSerialNumber: data.truckSerialNumber,
                        catCusID: data.catCusID,
                    })
                    .where(
                        and(
                            eq(inspection.id, data.id),
                            eq(inspection.empID, user.id),
                        ),
                    ); // Ensures only the inspector who created it can update it

                return c.json({ message: "Inspection Updated" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Update the inspection",
                });
            }
        },
    )
    .delete(
        "/:id",
        authMiddleWare,
        zValidator("param", z.object({ id: z.number() })),
        async (c) => {
            try {
                const user = c.get("user");
                const { id } = c.req.valid("param");

                await db
                    .delete(inspection)
                    .where(
                        and(
                            eq(inspection.id, id),
                            eq(inspection.empID, user.id),
                        ),
                    ); // Ensures only the inspector who created it can delete it

                return c.json({ message: "Inspection Deleted" });
            } catch (error) {
                throw new HTTPException(500, {
                    message: "Cannot Delete the inspection",
                });
            }
        },
    );

export default app;
