import { EducationEntity } from "../../data/entities/Education.entity";
import { EducationRepository } from "../../data/repositories/EducationRepository";
import { education } from "@monorepo/types";

export class EducationService {
  private educationRepository: EducationRepository;

  constructor() {
    this.educationRepository = new EducationRepository();
  }

  private mapEntityToModel(entity: EducationEntity): education {
    return {
      education_id: entity.education_id,
      alumni_id: entity.alumni_id,
      degree_title: entity.degree_title,
      field_of_study: entity.field_of_study,
      start_year: entity.start_year,
      end_year: entity.end_year,
      is_current: entity.is_current,
      institution: entity.institution,
    };
  }
  async getAllEducation(): Promise<education[]> {
    console.log("Fetching all education records...");
    return this.educationRepository
      .findAll()
      .then((entities) => entities.map(this.mapEntityToModel));
  }
  async getEducationByAlumniId(alumni_id: number): Promise<education[]> {
    console.log(`Fetching education for alumni ID: ${alumni_id}...`);
    return this.educationRepository
      .findByAlumniId(alumni_id)
      .then((entities) => entities.map(this.mapEntityToModel));
  }
  async getEducationById(education_id: number): Promise<education | null> {
    const entity = await this.educationRepository.findById(education_id);
    return entity ? this.mapEntityToModel(entity) : null;
  }
  async getEducationByInstitution(institution: string): Promise<education[]> {
    console.log(`Fetching education for institution: ${institution}...`);
    return this.educationRepository
      .findByInstitution(institution)
      .then((entities) => entities.map(this.mapEntityToModel));
  }
  async getEducationByDegreeTitle(degree_title: string): Promise<education[]> {
    console.log(`Fetching education for degree title: ${degree_title}...`);
    return this.educationRepository
      .findByDegreeTitle(degree_title)
      .then((entities) => entities.map(this.mapEntityToModel));
  }
  async getEducationByFieldOfStudy(
    field_of_study: string,
  ): Promise<education[]> {
    console.log(`Fetching education for field of study: ${field_of_study}...`);
    return this.educationRepository
      .findByFieldOfStudy(field_of_study)
      .then((entities) => entities.map(this.mapEntityToModel));
  }
  async getEducationByStartYear(start_year: number): Promise<education[]> {
    console.log(`Fetching education for start year: ${start_year}...`);
    return this.educationRepository
      .findByStartYear(start_year)
      .then((entities) => entities.map(this.mapEntityToModel));
  }
  async getEducationByEndYear(end_year: number): Promise<education[]> {
    console.log(`Fetching education for end year: ${end_year}...`);
    return this.educationRepository
      .findByEndYear(end_year)
      .then((entities) => entities.map(this.mapEntityToModel));
  }

  async createEducation(dto: education): Promise<education> {
    const entity = await this.educationRepository.create({
      alumni_id: dto.alumni_id,
      degree_title: dto.degree_title,
      field_of_study: dto.field_of_study,
      start_year: dto.start_year,
      end_year: dto.end_year,
      is_current: dto.is_current,
      institution: dto.institution,
    });
    return this.mapEntityToModel(entity);
  }
  async updateEducation(
    education_id: number,
    dto: education,
  ): Promise<education | null> {
    const existingEducation =
      await this.educationRepository.findById(education_id);
    if (!existingEducation) {
      return null;
    }
    const entity = await this.educationRepository.update(education_id, {
      alumni_id: dto.alumni_id,
      degree_title: dto.degree_title,
      field_of_study: dto.field_of_study,
      start_year: dto.start_year,
      end_year: dto.end_year,
      is_current: dto.is_current,
      institution: dto.institution,
    });
    return entity ? this.mapEntityToModel(entity) : null;
  }
  async deleteEducation(education_id: number): Promise<boolean> {
    return this.educationRepository.delete(education_id);
  }
}
