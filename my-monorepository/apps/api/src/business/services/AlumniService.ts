import { AlumniEntity } from "../../data/entities/Alumni.entity";
import { AlumniRepository } from "../../data/repositories/AlumniRepository";
import { alumni, Gender } from "@monorepo/types";
import bcrypt from "bcrypt";

export class AlumniService {
  private alumniRepository: AlumniRepository;

  constructor() {
    this.alumniRepository = new AlumniRepository();
  }

  private mapEntityToModel(entity: AlumniEntity): alumni {
    return {
      alumni_id: entity.alumni_id,
      student_id: entity.student_id,
      first_name: entity.first_name,
      last_name: entity.last_name,
      email: entity.email,
      graduation_year: entity.graduation_year,
      cgpa: entity.cgpa,
      account_status: entity.account_status,
      // Map other fields as needed
      bio: entity.bio,
      current_city: entity.current_city,
      current_country: entity.current_country,
      profile_photo_url: entity.profile_photo_url,
      date_of_birth: entity.date_of_birth,
      dept_id: entity.dept_id,
      gender: entity.gender,
      phone: entity.phone,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }

  async getAllAlumni(): Promise<alumni[]> {
    console.log("Fetching all alumnis...");
    return this.alumniRepository
      .findAll()
      .then((entities) => entities.map(this.mapEntityToModel));
  }

  async getAlumniById(id: number): Promise<alumni | null> {
    return this.alumniRepository
      .findById(id)
      .then((entity) => (entity ? this.mapEntityToModel(entity) : null));
  }

  async getAlumniByStudentId(student_id: string): Promise<alumni | null> {
    return this.alumniRepository
      .findByStudentId(student_id)
      .then((entity) => (entity ? this.mapEntityToModel(entity) : null));
  }

  async getAlumniByGender(gender: Gender): Promise<alumni[]> {
    return this.alumniRepository
      .findAllbyGender(gender)
      .then((entities) => entities.map(this.mapEntityToModel));
  }

  async getAlumniBygraduationYear(year: number): Promise<alumni[]> {
    return this.alumniRepository
      .findAllbyGraduationYear(year)
      .then((entities) => entities.map(this.mapEntityToModel));
  }

  async getAlumniByDepartment(dept_id: number): Promise<alumni[]> {
    return this.alumniRepository
      .findAllbyDepartment(dept_id)
      .then((entities) => entities.map(this.mapEntityToModel));
  }

  async getAlumniByEmploymentSortedByCompany(): Promise<alumni[]> {
    return this.alumniRepository
      .findAllbyEmploymentSortedByCompany()
      .then((entities) => entities.map(this.mapEntityToModel));
  }

  async getAlumniByEmploymentSortedByIndustry(): Promise<alumni[]> {
    return this.alumniRepository
      .findAllbyEmploymentSortedByIndustry()
      .then((entities) => entities.map(this.mapEntityToModel));
  }

  async getAlumniByEmploymentSortedByCountry(): Promise<alumni[]> {
    return this.alumniRepository
      .findAllbyEmploymentSortedByCountry()
      .then((entities) => entities.map(this.mapEntityToModel));
  }

  async getAlumniByEmploymentCountry(country: string): Promise<alumni[]> {
    return this.alumniRepository
      .findAlumnibyEmploymentCountry(country)
      .then((entities) => entities.map(this.mapEntityToModel));
  }

  async findAlumnibyFieldOfStudy(field_of_study: string): Promise<alumni[]> {
    return this.alumniRepository
      .findAlumnibyFieldOfStudy(field_of_study)
      .then((entities) => entities.map(this.mapEntityToModel));
  }

  async createAlumni(dto: alumni): Promise<alumni> {
    // Check if alumni already exists
    const existingAlumni = await this.alumniRepository.findByStudentId(
      dto.student_id,
    );
    if (existingAlumni) {
      throw new Error("Alumni with this student ID already exists");
    }
    const entity = await this.alumniRepository.create({
      student_id: dto.student_id,
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
      graduation_year: dto.graduation_year,
      cgpa: dto.cgpa,
      account_status: dto.account_status,
      // Map other fields as needed
      bio: dto.bio,
      current_city: dto.current_city,
      current_country: dto.current_country,
      profile_photo_url: dto.profile_photo_url,
      date_of_birth: dto.date_of_birth,
      dept_id: dto.dept_id,
      gender: dto.gender,
      phone: dto.phone,
    });
    return this.mapEntityToModel(entity);
  }

  async updateAlumni(id: number, dto: alumni): Promise<alumni | null> {
    // Check if alumni exists
    const existingAlumni = await this.alumniRepository.findById(id);
    if (!existingAlumni) {
      return null;
    }
    // Check student ID uniqueness if updating student_id
    if (dto.student_id && dto.student_id !== existingAlumni.student_id) {
      const alumniWithStudentId = await this.alumniRepository.findByStudentId(
        dto.student_id,
      );
      if (alumniWithStudentId) {
        throw new Error("Alumni with this student ID already exists");
      }
    }
    const entity = await this.alumniRepository.update(id, {
      student_id: dto.student_id,
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
      graduation_year: dto.graduation_year,
      cgpa: dto.cgpa,
      account_status: dto.account_status,
      bio: dto.bio,
      current_city: dto.current_city,
      current_country: dto.current_country,
      profile_photo_url: dto.profile_photo_url,
      date_of_birth: dto.date_of_birth,
      dept_id: dto.dept_id,
      gender: dto.gender,
      phone: dto.phone,
    });
    return entity ? this.mapEntityToModel(entity) : null;
  }

  async deleteAlumni(id: number): Promise<boolean> {
    return this.alumniRepository.delete(id);
  }
}
