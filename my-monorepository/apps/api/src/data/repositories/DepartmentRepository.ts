import { AppDataSource } from "../database";
import { DepartmentEntity } from "../entities/Departments.entity";

export class DepartmentRepository {
  private repository = AppDataSource.getRepository(DepartmentEntity);

  constructor() {
    this.repository = AppDataSource.getRepository(DepartmentEntity);
  }

  async findAll(): Promise<DepartmentEntity[]> {
    return this.repository.find();
  }

  async findById(dept_id: number): Promise<DepartmentEntity | null> {
    return this.repository.findOne({ where: { dept_id } });
  }
  async findByCode(dept_code: string): Promise<DepartmentEntity | null> {
    return this.repository.findOne({ where: { dept_code } });
  }
  async create(data: Partial<DepartmentEntity>): Promise<DepartmentEntity> {
    const department = this.repository.create(data);
    return this.repository.save(department);
  }

  async update(
    dept_id: number,
    data: Partial<DepartmentEntity>,
  ): Promise<DepartmentEntity | null> {
    await this.repository.update(dept_id, data);
    return this.findById(dept_id);
  }

  async delete(dept_id: number): Promise<boolean> {
    const result = await this.repository.delete(dept_id);
    return (result.affected ?? 0) > 0;
  }
}
