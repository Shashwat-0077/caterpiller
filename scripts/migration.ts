import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { consola } from "consola";

config({ path: ".evn.local" });

consola.info(process.env.DATABASE_URL!);

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);
const main = async () => {
    try {
        await migrate(db, { migrationsFolder: "drizzle" });
        consola.success("Migration completed");
    } catch (error) {
        consola.error("Error during migration:", error);
        process.exit(1);
    }
};
main();
