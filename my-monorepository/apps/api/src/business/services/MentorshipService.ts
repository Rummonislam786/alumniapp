import { MentorshipEntity } from "../../data/entities/Mentorship.entity";
import { MentorshipRepository } from "../../data/repositories/MentorshipRepository";
import { mentorship } from "@monorepo/types";

export class MentorshipServices {
  private mentorshipRepository: MentorshipRepository;
  constructor() {
    this.mentorshipRepository = new MentorshipRepository();
  }
  private mapEntityToModel(entity: MentorshipEntity): mentorship {
    return {
      mentorship_id: entity.mentorship_id,
      mentor_id: entity.mentor_id,
      mentee_name: entity.mentee_name,
      mentee_alumni_id: entity.mentee_alumni_id,
      focus_area: entity.focus_area,
      start_date: entity.start_date,
      end_date: entity.end_date,
      status: entity.status,
    };
  }
  async getAllMentorship(): Promise<mentorship[]> {
    return this.mentorshipRepository
      .findAll()
      .then((entities) => entities.map(this.mapEntityToModel));
  }

  async getMentorShipById(id: number): Promise<mentorship | null> {
    const entity = await this.mentorshipRepository.findById(id);
    return entity ? this.mapEntityToModel(entity) : null;
  }

  async getMentorshipByMenteeId(id: number): Promise<mentorship[] | null> {
    return this.mentorshipRepository
      .findByMenteeId(id)
      .then((entities) => entities.map(this.mapEntityToModel));
  }
  async getMentorshipByMentorId(id: number): Promise<mentorship[] | null> {
    return this.mentorshipRepository
      .findByMentorId(id)
      .then((entities) => entities.map(this.mapEntityToModel));
  }
  async createMentorship(dto: mentorship): Promise<mentorship> {
    const entity = await this.mentorshipRepository.create({
      mentor_id: dto.mentor_id,
      mentee_name: dto.mentee_name,
      mentee_alumni_id: dto.mentee_alumni_id,
      focus_area: dto.focus_area,
      start_date: dto.start_date,
      end_date: dto.end_date,
      status: dto.status,
    });
    return this.mapEntityToModel(entity);
  }
  async updateMentorship(
    id: number,
    dto: mentorship,
  ): Promise<mentorship | null> {
    const existingMentorship = await this.mentorshipRepository.findById(id);
    if (!existingMentorship) {
      return null;
    }
    const entity = await this.mentorshipRepository.update(id, {
      mentor_id: dto.mentor_id,
      mentee_name: dto.mentee_name,
      mentee_alumni_id: dto.mentee_alumni_id,
      focus_area: dto.focus_area,
      start_date: dto.start_date,
      end_date: dto.end_date,
      status: dto.status,
    });
    return entity ? this.mapEntityToModel(entity) : null;
  }
  async deleteMentorship(id: number): Promise<boolean> {
    return this.mentorshipRepository.delete(id);
  }
}
