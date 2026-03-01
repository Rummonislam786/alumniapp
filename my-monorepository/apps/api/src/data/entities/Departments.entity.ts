import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { AlumniEntity } from "./Alumni.entity";

@Entity("departments")
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  dept_id!: number;
  // dept_id: number;
  @Column("varchar")
  dept_code!: string;
  // dept_code: string;
  @Column("varchar")
  dept_name!: string;
  // dept_name: string;
  @OneToMany(() => AlumniEntity, (alumni) => alumni.department)
  alumni!: AlumniEntity[];
}
