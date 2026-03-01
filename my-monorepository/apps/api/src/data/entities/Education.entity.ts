import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AlumniEntity } from "./Alumni.entity";
@Entity("education")
export class EducationEntity {
  @PrimaryGeneratedColumn()
  education_id!: number;
  // education_id: number;
  @ManyToOne(() => AlumniEntity, (alumni) => alumni.education)
  @JoinColumn({ name: "alumni_id" })
  alumni!: AlumniEntity;
  //   alumni_id: number;
  @Column("varchar")
  institution!: string;
  //   institution: string;
  @Column("varchar")
  degree_title!: string;
  //   degree_title: string;
  @Column("varchar")
  field_of_study!: string;
  //   field_of_study: string;
  @Column("int")
  start_year!: number;
  //   start_year: number;
  @Column("int")
  end_year!: number;
  //   end_year: number;
  @Column("boolean")
  is_current!: boolean;
  //   is_current: boolean;
}
