import { AppDataSource } from "../database";
import { EducationEntity } from "../entities/Education.entity";

export class EducationRepository {
  private repository = AppDataSource.getRepository(EducationEntity);

  constructor() {
    this.repository = AppDataSource.getRepository(EducationEntity);
  }

  async findAll(): Promise<EducationEntity[]> {
    return this.repository.find();
  }

  async findById(education_id: number): Promise<EducationEntity | null> {
    return this.repository.findOne({ where: { education_id } });
  }

  async findByAlumniId(alumni_id: number): Promise<EducationEntity[]> {
    return this.repository.find({ where: { alumni_id } });
  }

  async findByInstitution(institution: string): Promise<EducationEntity[]> {
    return this.repository.find({ where: { institution } });
  }

  async findByDegreeTitle(degree_title: string): Promise<EducationEntity[]> {
    return this.repository.find({ where: { degree_title } });
  }

  async findByFieldOfStudy(field_of_study: string): Promise<EducationEntity[]> {
    return this.repository.find({ where: { field_of_study } });
  }

  async findByStartYear(start_year: number): Promise<EducationEntity[]> {
    return this.repository.find({ where: { start_year } });
  }

  async findByEndYear(end_year: number): Promise<EducationEntity[]> {
    return this.repository.find({ where: { end_year } });
  }

  async create(data: Partial<EducationEntity>): Promise<EducationEntity> {
    const education = this.repository.create(data);
    return this.repository.save(education);
  }

  async update(
    education_id: number,
    data: Partial<EducationEntity>,
  ): Promise<EducationEntity | null> {
    await this.repository.update(education_id, data);
    return this.findById(education_id);
  }

  async delete(education_id: number): Promise<boolean> {
    const result = await this.repository.delete(education_id);
    return (result.affected ?? 0) > 0;
  }
}
