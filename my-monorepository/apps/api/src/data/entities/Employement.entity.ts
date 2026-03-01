import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AlumniEntity } from "./Alumni.entity";
Entity("employment");
export class EmploymentEntity {
  @PrimaryGeneratedColumn()
  employment_id!: number;
  // employment_id: number;
  @ManyToOne(() => AlumniEntity, (alumni) => alumni.employment)
  @JoinColumn({ name: "alumni_id" })
  alumni!: AlumniEntity;
  //   alumni_id: number;
  @Column("varchar")
  company_name!: string;
  //   company_name: string;
  @Column("varchar")
  job_title!: string;
  //   job_title: string;
  @Column("varchar")
  industry!: string;
  //   industry: string;
  @Column("varchar")
  city!: string;
  //   city: string;
  @Column("varchar")
  country!: string;
  //   country: string;
  @Column("date")
  start_date!: Date;
  //   start_date: Date;
  @Column("date", { nullable: true })
  end_date!: Date;
  //   end_date?: Date;
  @Column("boolean")
  is_current!: boolean;
  //   is_current: boolean;
}
