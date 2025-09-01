import { MikroORM } from "@mikro-orm/core";
import { RequestHistory } from "../entities/RequestHistory";

let ormInstance: MikroORM | null = null;

export async function getOrm() {
  if (!ormInstance) {
    ormInstance = await MikroORM.init({
      entities: [RequestHistory], // ✅ using the entity class, not a type
      dbName: process.env.DB_NAME || "dev.sqlite",
      type: "sqlite",
      debug: process.env.NODE_ENV !== "production",
    });
  }
  return ormInstance;
}
