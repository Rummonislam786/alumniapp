import { DataSource } from "typeorm";
import { AlumniEntity } from "./entities/Alumni.entity";
import { DepartmentEntity } from "./entities/Departments.entity";
import { EducationEntity } from "./entities/Education.entity";
import { EmploymentEntity } from "./entities/Employement.entity";
import { MentorshipEntity } from "./entities/Mentorship.entity";
import { EventEntity } from "./entities/Events.entity";
import { EventRegEntity } from "./entities/EventReg.Entity";
import { UserEntity } from "./entities/Users.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "alumni_app3",
  entities: [
    AlumniEntity,
    DepartmentEntity,
    EducationEntity,
    MentorshipEntity,
    EmploymentEntity,
    EventEntity,
    EventRegEntity,
    UserEntity,
  ],
  synchronize: process.env.NODE_ENV === "development", // Auto-sync in dev only
  logging: process.env.NODE_ENV === "development",
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Database connection established");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
};
