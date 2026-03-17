import { EventEntity } from "../../data/entities/Events.entity";
import { EventRepository } from "../../data/repositories/EventRepository";
import { events } from "@monorepo/types";

export class EventService {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  private mapEntityToModel(entity: EventEntity): events {
    return {
      event_id: entity.event_id,
      event_name: entity.event_name,
      event_type: entity.event_type,
      description: entity.description,
      event_date: entity.event_date,
      event_time: entity.event_time,
      venue: entity.venue,
      city: entity.city,
      country: entity.country,
      is_virtual: entity.is_virtual,
      virtual_link: entity.virtual_link,
      max_capacity: entity.max_capacity,
      created_at: entity.created_at,
    };
  }
  async getAllEvent(): Promise<events[]> {
    return this.eventRepository
      .findAll()
      .then((entities) => entities.map(this.mapEntityToModel));
  }

  async getDepartmentById(id: number): Promise<events | null> {
    const entity = await this.eventRepository.findById(id);
    return entity ? this.mapEntityToModel(entity) : null;
  }
  async createEvent(dto: events): Promise<events> {
    const entity = await this.eventRepository.create({
      event_name: dto.event_name,
      event_type: dto.event_type,
      description: dto.description,
      event_date: dto.event_date,
      event_time: dto.event_time,
      venue: dto.venue,
      city: dto.city,
      country: dto.country,
      is_virtual: dto.is_virtual,
      virtual_link: dto.virtual_link,
      max_capacity: dto.max_capacity,
    });
    return this.mapEntityToModel(entity);
  }
  async updateEvent(id: number, dto: events): Promise<events | null> {
    const existingEvents = await this.eventRepository.findById(id);
    if (!existingEvents) {
      return null;
    }
    const entity = await this.eventRepository.update(id, {
      event_name: dto.event_name,
      event_type: dto.event_type,
      description: dto.description,
      event_date: dto.event_date,
      event_time: dto.event_time,
      venue: dto.venue,
      city: dto.city,
      country: dto.country,
      is_virtual: dto.is_virtual,
      virtual_link: dto.virtual_link,
      max_capacity: dto.max_capacity,
    });
    return entity ? this.mapEntityToModel(entity) : null;
  }
  async deleteEvent(id: number): Promise<boolean> {
    return this.eventRepository.delete(id);
  }
}
