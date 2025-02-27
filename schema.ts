import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bikes = pgTable("bikes", {
  id: serial("id").primaryKey(),
  model: text("model").notNull(),
  productCode: text("product_code").notNull(),
  price: integer("price").notNull(),
});

export const insertBikeSchema = createInsertSchema(bikes).pick({
  model: true,
  productCode: true,
  price: true,
});

export type InsertBike = z.infer<typeof insertBikeSchema>;
export type Bike = typeof bikes.$inferSelect;
