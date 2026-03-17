// import { AppDataSource } from "../database";
// import { EventEntity } from "../entities/Events.entity";
import { AppDataSource } from "../database";
import { MentorshipEntity } from "../entities/Mentorship.entity";

export class MentorshipRepository {
  private repository = AppDataSource.getRepository(MentorshipEntity);
  constructor() {
    this.repository = AppDataSource.getRepository(MentorshipEntity);
  }

  async findAll(): Promise<MentorshipEntity[]> {
    return this.repository.find();
  }

  async findById(mentorship_id: number): Promise<MentorshipEntity | null> {
    return this.repository.findOne({ where: { mentorship_id } });
  }
  async findByMentorId(mentor_id: number): Promise<MentorshipEntity[]> {
    return this.repository.find({ where: { mentor_id } });
  }
  async findByMenteeId(mentee_alumni_id: number): Promise<MentorshipEntity[]> {
    return this.repository.find({ where: { mentee_alumni_id } });
  }

  async create(data: Partial<MentorshipEntity>): Promise<MentorshipEntity> {
    const mentorship = this.repository.create(data);
    return this.repository.save(mentorship);
  }

  async update(
    mentorship_id: number,
    data: Partial<MentorshipEntity>,
  ): Promise<MentorshipEntity | null> {
    await this.repository.update(mentorship_id, data);
    return this.findById(mentorship_id);
  }
  async delete(mentorship_id: number): Promise<boolean> {
    const result = await this.repository.delete(mentorship_id);
    return (result.affected ?? 0) > 0;
  }
}
