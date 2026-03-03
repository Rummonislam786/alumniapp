import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  RelationId,
} from "typeorm";
import { AlumniEntity } from "./Alumni.entity";
// @Entity("users")
// export class UserEntity {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column({ type: "varchar", unique: true })
//   email!: string;

//   @Column("varchar")
//   name!: string;

//   @Column("varchar")
//   password!: string;

//   @OneToMany(() => TaskEntity, (task) => task.user)
//   tasks!: TaskEntity[];

//   @CreateDateColumn()
//   createdAt!: Date;

//   @UpdateDateColumn()
//   updatedAt!: Date;
// }
//   user_id: number;
//   alumni_id: number;
//   password_hash: string;
//   last_login: Date;
//   created_at: Date;
@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @OneToOne(() => AlumniEntity)
  @JoinColumn({ name: "alumni_id" }) // creates foreign key column
  alumni!: AlumniEntity;

  @RelationId((user: UserEntity) => user.alumni)
  alumni_id!: number;

  @Column("varchar")
  password_hash!: string;

  @Column("timestamp", { nullable: true })
  last_login!: Date;

  @CreateDateColumn()
  created_at!: Date;
}
