import { AppDataSource } from "../database";

import { AlumniEntity } from "../entities/Alumni.entity";
import { Gender } from "@monorepo/types";

export class AlumniRepository {
  private repository = AppDataSource.getRepository(AlumniEntity);

  constructor() {
    this.repository = AppDataSource.getRepository(AlumniEntity);
  }

  async findAll(): Promise<AlumniEntity[]> {
    return this.repository.find();
  }

  async findById(alumni_id: number): Promise<AlumniEntity | null> {
    return this.repository.findOne({ where: { alumni_id } });
  }

  async findByStudentId(student_id: string): Promise<AlumniEntity | null> {
    return this.repository.findOneBy({ student_id });
  }

  async findAllbyDepartment(dept_id: number): Promise<AlumniEntity[]> {
    return this.repository.find({ where: { department: { dept_id } } });
  }

  async findAllbyGraduationYear(year: number): Promise<AlumniEntity[]> {
    return this.repository.find({ where: { graduation_year: year } });
  }

  async findAllbyEmploymentSortedByCompany(): Promise<AlumniEntity[]> {
    return this.repository.find({
      relations: ["employment"],
      order: {
        employment: {
          company_name: "ASC",
        },
      },
    });
  }

  async findAllbyGender(gender: Gender): Promise<AlumniEntity[]> {
    return this.repository.find({ where: { gender: gender } });
  }

  async findAllbyEmploymentSortedByIndustry(): Promise<AlumniEntity[]> {
    return this.repository.find({
      relations: ["employment"],
      order: {
        employment: {
          industry: "ASC",
        },
      },
    });
  }

  async findAllbyEmploymentSortedByCountry(): Promise<AlumniEntity[]> {
    return this.repository.find({
      relations: ["employment"],
      order: {
        employment: {
          country: "ASC",
        },
      },
    });
  }

  async findAlumnibyEmploymentCountry(
    country: string,
  ): Promise<AlumniEntity[]> {
    return this.repository.find({
      relations: ["employment"],
      where: {
        employment: {
          country: country,
        },
      },
    });
  }

  async findAlumnibyFieldOfStudy(
    field_of_study: string,
  ): Promise<AlumniEntity[]> {
    return this.repository.find({
      relations: ["education"],
      where: {
        education: {
          field_of_study: field_of_study,
        },
      },
    });
  }

  async create(data: Partial<AlumniEntity>): Promise<AlumniEntity> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  async update(
    user_id: number,
    data: Partial<AlumniEntity>,
  ): Promise<AlumniEntity | null> {
    await this.repository.update(user_id, data);
    return this.findById(user_id);
  }

  async delete(user_id: number): Promise<boolean> {
    const result = await this.repository.delete(user_id);
    return (result.affected ?? 0) > 0;
  }
}
