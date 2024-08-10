import { relations } from "drizzle-orm";
import {
    date,
    doublePrecision,
    integer,
    pgEnum,
    pgTable,
    primaryKey,
    serial,
    text,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const users = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: date("emailVerified"),
    image: text("image"),
});
export const userRelations = relations(users, ({ many }) => ({
    accounts: many(account),
    inspections: many(inspection),
}));
export const usersSchema = createInsertSchema(users);

export const account = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type"),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    }),
);
export const accountsSchema = createInsertSchema(account);
export const accountRelations = relations(account, ({ one }) => ({
    user: one(users, {
        fields: [account.userId],
        references: [users.id],
    }),
}));

// Inspection
export const inspection = pgTable("inspection", {
    id: serial("id").primaryKey(),
    truckSerialNumber: text("truckSerialNumber"),
    truckModel: text("truckModel"),
    inspectorName: text("inspectorName"),
    empID: text("inspectorEmployeeID"),
    date: date("dateOdInspection"),
    location: text("location"),
    lat: doublePrecision("lat"),
    long: doublePrecision("long"),
    meterHours: doublePrecision("meterHorse"),
    customerName: text("customerName"),
    catCusID: text("cusID"),
});

export const inspectionSchema = createInsertSchema(inspection);
export const inspectionRelations = relations(inspection, ({ one }) => ({
    emp: one(users, {
        fields: [inspection.empID],
        references: [users.id],
    }),
}));

// Enums for the conditions
export const ConditionEnum = pgEnum("condition", [
    "Good",
    "Ok",
    "Needs Replacement",
]);
export const YesNoEnum = pgEnum("yesNo", ["Y", "N"]);
export const FluidLevelEnum = pgEnum("fluidLevel", ["Good", "Ok", "Low"]);
export const OilColorEnum = pgEnum("oilColor", ["Clean", "Brown", "Black"]);
export const OilConditionEnum = pgEnum("oilCondition", ["Good", "Bad"]);

// Tires Schema
export const tires = pgTable("tires", {
    id: serial("id").primaryKey(),
    inspectionID: integer("inspectionID")
        .notNull()
        .references(() => inspection.id, { onDelete: "cascade" }),
    leftFrontPressure: integer("left_front_pressure"),
    rightFrontPressure: integer("right_front_pressure"),
    leftFrontCondition: ConditionEnum("left_front_condition"),
    rightFrontCondition: ConditionEnum("right_front_condition"),
    leftRearPressure: integer("left_rear_pressure"),
    rightRearPressure: integer("right_rear_pressure"),
    leftRearCondition: ConditionEnum("left_rear_condition"),
    rightRearCondition: ConditionEnum("right_rear_condition"),
    overallSummary: text("overall_summary").notNull(),
    images: text("images").array(), // Array of image paths or URLs
});
export const TireSchema = createInsertSchema(tires);

// Battery Schema
export const battery = pgTable("battery", {
    id: serial("id").primaryKey(),
    inspectionID: integer("inspectionID")
        .notNull()
        .references(() => inspection.id, { onDelete: "cascade" }),
    make: text("make").notNull(),
    replacementDate: date("replacement_date"),
    voltage: doublePrecision("voltage"), // example: 12.34V
    waterLevel: FluidLevelEnum("water_level"),
    condition: YesNoEnum("condition"),
    leakRust: YesNoEnum("leak_rust"),
    overallSummary: text("overall_summary").notNull(),
    images: text("images").array(), // Array of image paths or URLs
});

export const BatterySchema = createInsertSchema(battery);

// Exterior Schema
export const exterior = pgTable("exterior", {
    id: serial("id").primaryKey(),
    inspectionID: integer("inspectionID")
        .notNull()
        .references(() => inspection.id, { onDelete: "cascade" }),
    rustDentDamage: YesNoEnum("rust_dent_damage"),
    oilLeakSuspension: YesNoEnum("oil_leak_suspension"),
    overallSummary: text("overall_summary").notNull(),
    images: text("images").array(), // Array of image paths or URLs
});

export const ExteriorSchema = createInsertSchema(exterior);

// Brakes Schema
export const brakes = pgTable("brakes", {
    id: serial("id").primaryKey(),
    inspectionID: integer("inspectionID")
        .notNull()
        .references(() => inspection.id, { onDelete: "cascade" }),
    fluidLevel: FluidLevelEnum("fluid_level"),
    frontCondition: ConditionEnum("front_condition"),
    rearCondition: ConditionEnum("rear_condition"),
    emergencyBrakeCondition: FluidLevelEnum("emergency_brake_condition"),
    overallSummary: text("overall_summary").notNull(),
    images: text("images").array(), // Array of image paths or URLs
});
export const BrakeSchema = createInsertSchema(brakes);

// Engine Schema
export const engine = pgTable("engine", {
    id: serial("id").primaryKey(),
    inspectionID: integer("inspectionID")
        .notNull()
        .references(() => inspection.id, { onDelete: "cascade" }),
    rustDentDamage: YesNoEnum("rust_dent_damage"),
    oilCondition: OilConditionEnum("oil_condition"),
    oilColor: OilColorEnum("oil_color"),
    brakeFluidCondition: OilConditionEnum("brake_fluid_condition"),
    brakeFluidColor: OilColorEnum("brake_fluid_color"),
    oilLeak: YesNoEnum("oil_leak"),
    overallSummary: text("overall_summary").notNull(),
    images: text("images").array(), // Array of image paths or URLs
});

export const EngineSchema = createInsertSchema(engine);

export const Comments = pgTable("comments", {
    id: serial("id").primaryKey(),
    title: text("title"),
    body: text("body"),
});
export const CommentsSchema = createInsertSchema(Comments);
