import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { EventType } from "@monorepo/types";

@Entity("events")
export class EventEntity {
  @PrimaryGeneratedColumn()
  event_id!: number;
  //  event_id: number;
  @Column("varchar")
  event_name!: string;
  //   event_name: string;
  @Column({
    type: "enum",
    enum: EventType,
    default: EventType.Reunion,
  })
  event_type!: EventType;
  //   event_type: EventType;
  @Column("text")
  description!: string;
  //   description: string;
  @Column("date")
  event_date!: Date;
  //   event_date: Date;
  @Column("time")
  event_time!: string;
  //   event_time: string;
  @Column("varchar")
  venue!: string;
  //   venue: string;
  @Column("varchar")
  city!: string;
  //   city: string;
  @Column("varchar")
  country!: string;
  //   country: string;
  @Column("boolean")
  is_virtual!: boolean;
  //   is_virtual: boolean;
  @Column("varchar", { nullable: true })
  virtual_link!: string;
  //   virtual_link?: string;
  @Column("int")
  max_capacity!: number;
  //   max_capacity: number;
  @CreateDateColumn()
  created_at!: Date;
  //   created_at: Date;
}
