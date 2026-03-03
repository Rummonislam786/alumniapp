import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  RelationId,
} from "typeorm";

import { AlumniEntity } from "./Alumni.entity";
import { MentorshipStatus } from "@monorepo/types";

@Entity("mentorship")
export class MentorshipEntity {
  @PrimaryGeneratedColumn()
  mentorship_id!: number;
  // mentorship_id: number;
  @ManyToOne(() => AlumniEntity, (alumni) => alumni.mentorshipsAsMentor)
  @JoinColumn({ name: "mentor_id" })
  mentor!: AlumniEntity;

  @RelationId((mentorship: MentorshipEntity) => mentorship.mentor)
  mentor_id!: number;
  //   mentor_id: number;

  @Column("varchar")
  mentee_name!: string;

  //   mentee_name: string;
  @ManyToOne(() => AlumniEntity, (alumni) => alumni.mentorshipsAsMentee)
  @JoinColumn({ name: "mentee_alumni_id" })
  mentee!: AlumniEntity;

  @RelationId((mentorship: MentorshipEntity) => mentorship.mentee)
  mentee_alumni_id!: number;
  //   mentee_alumni_id: number;
  @Column("varchar")
  focus_area!: string;
  //   focus_area: string;
  @Column("date")
  start_date!: Date;
  //   start_date: Date;
  @Column("date", { nullable: true })
  end_date!: Date;
  //   end_date?: Date;
  @Column({
    type: "enum",
    enum: MentorshipStatus,
    default: MentorshipStatus.Active,
  })
  status!: MentorshipStatus;
  //   status: MentorshipStatus;
}
