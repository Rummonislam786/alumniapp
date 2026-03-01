import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { DepartmentEntity } from "./Departments.entity";
import { AccountStatus, Gender } from "@monorepo/types";
import { EducationEntity } from "./Education.entity";
import { EmploymentEntity } from "./Employement.entity";
import { MentorshipEntity } from "./Mentorship.entity";

@Entity("alumni")
export class AlumniEntity {
  @PrimaryGeneratedColumn()
  alumni_id!: number;

  @Column("varchar", { unique: true })
  student_id!: string;

  @Column("varchar")
  first_name!: string;

  @Column("varchar")
  last_name!: string;

  @Column({
    type: "enum",
    enum: Gender,
  })
  gender!: Gender;

  @Column("date")
  date_of_birth!: Date;

  @Column("varchar", { unique: true })
  email!: string;

  @Column("varchar")
  phone!: string;

  @Column("varchar")
  current_city!: string;

  @Column("varchar")
  current_country!: string;

  @Column("varchar", { nullable: true })
  profile_picture_url!: string;

  @Column("text", { nullable: true })
  bio!: string;

  @ManyToOne(() => DepartmentEntity, (dept) => dept.alumni)
  @JoinColumn({ name: "dept_id" })
  department!: DepartmentEntity;

  @Column("int")
  graduation_year!: number;

  @Column("float")
  cgpa!: number;

  @Column({
    type: "enum",
    enum: AccountStatus,
    default: AccountStatus.Active,
  })
  account_status!: AccountStatus;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => EducationEntity, (education) => education.alumni)
  education!: EducationEntity[];

  @OneToMany(() => EmploymentEntity, (employment) => employment.alumni)
  employment!: EmploymentEntity[];

  @OneToMany(() => MentorshipEntity, (m) => m.mentor)
  mentorshipsAsMentor!: MentorshipEntity[];

  @OneToMany(() => MentorshipEntity, (m) => m.mentee)
  mentorshipsAsMentee!: MentorshipEntity[];
}
