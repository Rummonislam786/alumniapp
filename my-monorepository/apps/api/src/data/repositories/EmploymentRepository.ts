// import { AppDataSource } from "../database";
// import { DepartmentEntity } from "../entities/Departments.entity";
import { AppDataSource } from "../database";
import { EmploymentEntity } from "../entities/Employement.entity";

export class EmploymentRepository {
  private repository = AppDataSource.getRepository(EmploymentEntity);

  constructor() {
    this.repository = AppDataSource.getRepository(EmploymentEntity);
  }

  async findAll(): Promise<EmploymentEntity[]> {
    return this.repository.find();
  }

  async findById(employment_id: number): Promise<EmploymentEntity | null> {
    return this.repository.findOne({ where: { employment_id } });
  }

  async findByAlumniId(alumni_id: number): Promise<EmploymentEntity[]> {
    return this.repository.find({ where: { alumni_id } });
  }

  async findByCompanyName(company_name: string): Promise<EmploymentEntity[]> {
    return this.repository.find({ where: { company_name } });
  }

  async findByJobTitle(job_title: string): Promise<EmploymentEntity[]> {
    return this.repository.find({ where: { job_title } });
  }

  async findByIndustry(industry: string): Promise<EmploymentEntity[]> {
    return this.repository.find({ where: { industry } });
  }

  async findByCity(city: string): Promise<EmploymentEntity[]> {
    return this.repository.find({ where: { city } });
  }

  async findByCountry(country: string): Promise<EmploymentEntity[]> {
    return this.repository.find({ where: { country } });
  }

  async create(data: Partial<EmploymentEntity>): Promise<EmploymentEntity> {
    const employment = this.repository.create(data);
    return this.repository.save(employment);
  }

  async update(
    employment_id: number,
    data: Partial<EmploymentEntity>,
  ): Promise<EmploymentEntity | null> {
    await this.repository.update(employment_id, data);
    return this.findById(employment_id);
  }

  async delete(employment_id: number): Promise<boolean> {
    const result = await this.repository.delete(employment_id);
    return (result.affected ?? 0) > 0;
  }
}
