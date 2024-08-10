import { Hono } from "hono";
import { handle } from "hono/vercel";
import { HTTPException } from "hono/http-exception";
import upload from "./upload";
import inspection from "./inspection";
import comments from "./comments";
import consola from "consola";

const app = new Hono().basePath("/api");

app.onError((err, c) => {
    consola.error(err);
    if (err instanceof HTTPException) return err.getResponse();
    return c.json({ error: "Internal error" }, 500);
});

// IMPORTANT : Below routes should not be used in the backend api, cause they are used in another api endpoints
// ------- /api/auth/*

const routes = app
    .route("/upload", upload)
    .route("/inspection", inspection)
    .route("/comments", comments);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
