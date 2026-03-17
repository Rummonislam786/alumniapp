import { EmploymentEntity } from "../../data/entities/Employement.entity";
import { EmploymentRepository } from "../../data/repositories/EmploymentRepository";
import { employment } from "@monorepo/types";

export class EmploymentService {
  private employmentRepository: EmploymentRepository;

  constructor() {
    this.employmentRepository = new EmploymentRepository();
  }

  private mapEntityToModel(entity: EmploymentEntity): employment {
    return {
      employment_id: entity.employment_id,
      alumni_id: entity.alumni_id,
      company_name: entity.company_name,
      job_title: entity.job_title,
      industry: entity.industry,
      city: entity.city,
      country: entity.country,
      start_date: entity.start_date,
      end_date: entity.end_date,
      is_current: entity.is_current,
    };
  }
  async getEmploymentByAlumniId(alumni_id: number): Promise<employment[]> {
    console.log(`Fetching employment for alumni ID: ${alumni_id}...`);
    return this.employmentRepository
      .findByAlumniId(alumni_id)
      .then((entities) => entities.map(this.mapEntityToModel));
  }
  async getEmploymentById(employment_id: number): Promise<employment | null> {
    const entity = await this.employmentRepository.findById(employment_id);
    return entity ? this.mapEntityToModel(entity) : null;
  }
  async getEmploymentByCompanyName(
    company_name: string,
  ): Promise<employment[]> {
    console.log(`Fetching employment for company name: ${company_name}...`);
    return this.employmentRepository
      .findByCompanyName(company_name)
      .then((entities) => entities.map(this.mapEntityToModel));
  }
  async getEmploymentByJobTitle(job_title: string): Promise<employment[]> {
    console.log(`Fetching employment for job title: ${job_title}...`);
    return this.employmentRepository
      .findByJobTitle(job_title)
      .then((entities) => entities.map(this.mapEntityToModel));
  }
  async getEmploymentByIndustry(industry: string): Promise<employment[]> {
    console.log(`Fetching employment for industry: ${industry}...`);
    return this.employmentRepository
      .findByIndustry(industry)
      .then((entities) => entities.map(this.mapEntityToModel));
  }
  async getEmploymentByCity(city: string): Promise<employment[]> {
    console.log(`Fetching employment for city: ${city}...`);
    return this.employmentRepository
      .findByCity(city)
      .then((entities) => entities.map(this.mapEntityToModel));
  }
  async getEmploymentByCountry(country: string): Promise<employment[]> {
    console.log(`Fetching employment for country: ${country}...`);
    return this.employmentRepository
      .findByCountry(country)
      .then((entities) => entities.map(this.mapEntityToModel));
  }
  async createEmployment(dto: employment): Promise<employment> {
    const entity = await this.employmentRepository.create({
      alumni_id: dto.alumni_id,
      company_name: dto.company_name,
      job_title: dto.job_title,
      industry: dto.industry,
      city: dto.city,
      country: dto.country,
      start_date: dto.start_date,
      end_date: dto.end_date,
      is_current: dto.is_current,
    });
    return this.mapEntityToModel(entity);
  }
  async updateEmployment(
    employment_id: number,
    dto: employment,
  ): Promise<employment | null> {
    // Check if employment exists
    const existingEmployment =
      await this.employmentRepository.findById(employment_id);
    if (!existingEmployment) {
      return null;
    }
    const entity = await this.employmentRepository.update(employment_id, {
      alumni_id: dto.alumni_id,
      company_name: dto.company_name,
      job_title: dto.job_title,
      industry: dto.industry,
      city: dto.city,
      country: dto.country,
      start_date: dto.start_date,
      end_date: dto.end_date,
      is_current: dto.is_current,
    });
    return entity ? this.mapEntityToModel(entity) : null;
  }
  async deleteEmployment(employment_id: number): Promise<boolean> {
    return this.employmentRepository.delete(employment_id);
  }
  async getAllEmployments(): Promise<employment[]> {
    console.log("Fetching all employments...");
    return this.employmentRepository
      .findAll()
      .then((entities) => entities.map(this.mapEntityToModel));
  }
}
