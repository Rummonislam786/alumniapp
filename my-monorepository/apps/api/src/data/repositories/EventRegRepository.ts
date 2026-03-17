// import { AppDataSource } from "../database";
// import { DepartmentEntity } from "../entities/Departments.entity";
import { AppDataSource } from "../database";
import { EventRegEntity } from "../entities/EventReg.Entity";
// export class DepartmentRepository {
//   private repository = AppDataSource.getRepository(DepartmentEntity);
export class EventRegRepository {
  private repository = AppDataSource.getRepository(EventRegEntity);

  constructor() {
    this.repository = AppDataSource.getRepository(EventRegEntity);
  }

  async findAll(): Promise<EventRegEntity[]> {
    return this.repository.find();
  }

  async findById(reg_id: number): Promise<EventRegEntity | null> {
    return this.repository.findOne({ where: { reg_id } });
  }

  async findByAlumniId(alumni_id: number): Promise<EventRegEntity[]> {
    return this.repository.find({ where: { alumni_id } });
  }

  async findByEventId(event_id: number): Promise<EventRegEntity[]> {
    return this.repository.find({ where: { event_id } });
  }

  async create(data: Partial<EventRegEntity>): Promise<EventRegEntity> {
    const eventReg = this.repository.create(data);
    return this.repository.save(eventReg);
  }

  async update(
    reg_id: number,
    data: Partial<EventRegEntity>,
  ): Promise<EventRegEntity | null> {
    await this.repository.update(reg_id, data);
    return this.findById(reg_id);
  }
  async delete(reg_id: number): Promise<boolean> {
    const result = await this.repository.delete(reg_id);
    return (result.affected ?? 0) > 0;
  }
}
