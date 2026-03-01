import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { EventEntity } from "./Events.entity";
import { AlumniEntity } from "./Alumni.entity";

@Entity("event_registration")
export class EventRegEntity {
  @PrimaryGeneratedColumn()
  reg_id!: number;
  //   reg_id: number;
  @ManyToOne(() => EventEntity, (event) => event.event_id)
  @JoinColumn({ name: "event_id" })
  event!: EventEntity;
  //   event_id: number;
  @ManyToOne(() => AlumniEntity, (alumni) => alumni.alumni_id)
  @JoinColumn({ name: "alumni_id" })
  alumni!: AlumniEntity;
  //   alumni_id: number;
  @Column("timestamp")
  registered_at!: Date;
  //   registered_at: Date;
  @Column("boolean")
  attended!: boolean;
  //   attended: boolean;
}
