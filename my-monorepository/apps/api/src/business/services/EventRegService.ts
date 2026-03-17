// import { DepartmentEntity } from "../../data/entities/Departments.entity";
// import { DepartmentRepository } from "../../data/repositories/DepartmentRepository";
// import { departments } from "@monorepo/types";
import { EventRegEntity } from "../../data/entities/EventReg.Entity";
import { EventRegRepository } from "../../data/repositories/EventRegRepository";
import { event_registration } from "@monorepo/types";

export class EventRegService {
  private eventRegRepository: EventRegRepository;

  constructor() {
    this.eventRegRepository = new EventRegRepository();
  }
  private mapEntityToModel(entity: EventRegEntity): event_registration {
    return {
      reg_id: entity.reg_id,
      event_id: entity.event_id,
      alumni_id: entity.alumni_id,
      registered_at: entity.registered_at,
      attended: entity.attended,
    };
  }
  async getEventRegByAlumniId(
    alumni_id: number,
  ): Promise<event_registration[]> {
    console.log(`Fetching event registrations for alumni ID: ${alumni_id}...`);
    return this.eventRegRepository
      .findByAlumniId(alumni_id)
      .then((entities) => entities.map(this.mapEntityToModel));
  }
  async getEventRegByEventId(event_id: number): Promise<event_registration[]> {
    console.log(`Fetching event registrations for event ID: ${event_id}...`);
    return this.eventRegRepository
      .findByEventId(event_id)
      .then((entities) => entities.map(this.mapEntityToModel));
  }
  async getEventRegById(reg_id: number): Promise<event_registration | null> {
    const entity = await this.eventRegRepository.findById(reg_id);
    return entity ? this.mapEntityToModel(entity) : null;
  }
  async createEventReg(dto: event_registration): Promise<event_registration> {
    const entity = await this.eventRegRepository.create({
      event_id: dto.event_id,
      alumni_id: dto.alumni_id,
      registered_at: dto.registered_at,
      attended: dto.attended,
    });
    return this.mapEntityToModel(entity);
  }
  async updateEventReg(
    reg_id: number,
    dto: event_registration,
  ): Promise<event_registration | null> {
    // Check if event registration exists
    const existingEventReg = await this.eventRegRepository.findById(reg_id);
    if (!existingEventReg) {
      return null;
    }
    const entity = await this.eventRegRepository.update(reg_id, {
      event_id: dto.event_id,
      alumni_id: dto.alumni_id,
      registered_at: dto.registered_at,
      attended: dto.attended,
    });
    return entity ? this.mapEntityToModel(entity) : null;
  }
  async deleteEventReg(reg_id: number): Promise<boolean> {
    return this.eventRegRepository.delete(reg_id);
  }
  async getAllEventRegs(): Promise<event_registration[]> {
    console.log("Fetching all event registrations...");
    return this.eventRegRepository
      .findAll()
      .then((entities) => entities.map(this.mapEntityToModel));
  }
}
