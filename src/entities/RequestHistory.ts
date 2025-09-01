import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class RequestHistory {
  @PrimaryKey()
  id!: number;

  @Property()
  url!: string;

  @Property()
  method!: string;

  @Property({ type: 'text', nullable: true })
  response?: string;

  @Property()
  createdAt: Date = new Date();
}


