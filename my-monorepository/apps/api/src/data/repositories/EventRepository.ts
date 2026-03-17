import { AppDataSource } from "../database";
import { EventEntity } from "../entities/Events.entity";

export class EventRepository {
  private repository = AppDataSource.getRepository(EventEntity);
  constructor() {
    this.repository = AppDataSource.getRepository(EventEntity);
  }

  async findAll(): Promise<EventEntity[]> {
    return this.repository.find();
  }

  async findById(event_id: number): Promise<EventEntity | null> {
    return this.repository.findOne({ where: { event_id } });
  }

  async create(data: Partial<EventEntity>): Promise<EventEntity> {
    const event = this.repository.create(data);
    return this.repository.save(event);
  }

  async update(
    event_id: number,
    data: Partial<EventEntity>,
  ): Promise<EventEntity | null> {
    await this.repository.update(event_id, data);
    return this.findById(event_id);
  }
  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
