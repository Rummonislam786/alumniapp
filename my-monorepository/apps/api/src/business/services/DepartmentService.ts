import { DepartmentEntity } from "../../data/entities/Departments.entity";
import { DepartmentRepository } from "../../data/repositories/DepartmentRepository";
import { departments } from "@monorepo/types";

export class DepartmentService {
  private departmentRepository: DepartmentRepository;

  constructor() {
    this.departmentRepository = new DepartmentRepository();
  }

  private mapEntityToModel(entity: DepartmentEntity): departments {
    return {
      dept_id: entity.dept_id,
      dept_code: entity.dept_code,
      dept_name: entity.dept_name,
    };
  }

  async getAllDepartments(): Promise<departments[]> {
    console.log("Fetching all departments...");
    return this.departmentRepository
      .findAll()
      .then((entities) => entities.map(this.mapEntityToModel));
  }

  async getDepartmentById(id: number): Promise<departments | null> {
    const entity = await this.departmentRepository.findById(id);
    return entity ? this.mapEntityToModel(entity) : null;
  }

  async getDepartmentByCode(dept_code: string): Promise<departments | null> {
    const entity = await this.departmentRepository.findByCode(dept_code);
    return entity ? this.mapEntityToModel(entity) : null;
  }

  async createDepartment(dto: departments): Promise<departments> {
    // Check if department code already exists
    const existingDepartment = await this.departmentRepository.findByCode(
      dto.dept_code,
    );
    if (existingDepartment) {
      throw new Error("Department with this code already exists");
    }

    const entity = await this.departmentRepository.create({
      dept_code: dto.dept_code,
      dept_name: dto.dept_name,
    });
    return this.mapEntityToModel(entity);
  }

  async updateDepartment(
    id: number,
    dto: departments,
  ): Promise<departments | null> {
    // Check if department exists
    const existingDepartment = await this.departmentRepository.findById(id);
    if (!existingDepartment) {
      return null;
    }

    const entity = await this.departmentRepository.update(id, {
      dept_code: dto.dept_code,
      dept_name: dto.dept_name,
    });

    return entity ? this.mapEntityToModel(entity) : null;
  }

  async deleteDepartment(id: number): Promise<boolean> {
    return this.departmentRepository.delete(id);
  }
}
