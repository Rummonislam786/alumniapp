import { UserEntity } from "../../data/entities/Users.entity";
import { UsersRepository } from "../../data/repositories/UsersRepository";
import { users } from "@monorepo/types";
import bcrypt from "bcrypt";

export class UsersService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  private mapEntityToModel(entity: UserEntity): users {
    return {
      user_id: entity.user_id,
      alumni_id: entity.alumni_id,
      password_hash: entity.password_hash,
      last_login: entity.last_login,
      created_at: entity.created_at,
    };
  }

  async getAllUsers(): Promise<users[]> {
    console.log("Fetching all users...");
    return this.usersRepository
      .findAll()
      .then((entities) => entities.map(this.mapEntityToModel));
  }

  async getUserById(id: number): Promise<users | null> {
    return this.usersRepository
      .findById(id)
      .then((entity) => (entity ? this.mapEntityToModel(entity) : null));
  }

  async getUserByAlumniId(alumni_id: number): Promise<users | null> {
    return this.usersRepository
      .findbyAlumniId(alumni_id)
      .then((entity) => (entity ? this.mapEntityToModel(entity) : null));
  }

  async CreateUser(dto: users): Promise<users> {
    // Check if user already exists
    const existingUser = await this.usersRepository.findById(dto.alumni_id);
    if (existingUser) {
      throw new Error("User with this alumni ID already exists");
    }
    const hashedPassword = await bcrypt.hash(dto.password_hash, 10);

    const entity = await this.usersRepository.create({
      alumni_id: dto.alumni_id,
      password_hash: hashedPassword,
    });

    return this.mapEntityToModel(entity);
  }

  async updateUser(id: number, dto: users): Promise<users | null> {
    // Check if user exists
    const existingUser = await this.usersRepository.findById(id);
    if (!existingUser) {
      return null;
    }

    // Check alumni ID uniqueness if updating alumni_id
    if (dto.alumni_id && dto.alumni_id !== existingUser.alumni_id) {
      const userWithAlumniId = await this.usersRepository.findbyAlumniId(
        dto.alumni_id,
      );
      if (userWithAlumniId) {
        throw new Error("Alumni ID already in use");
      }
    }

    const entity = await this.usersRepository.update(id, {
      alumni_id: dto.alumni_id,
      password_hash: dto.password_hash
        ? await bcrypt.hash(dto.password_hash, 10)
        : existingUser.password_hash,
    });

    return entity ? this.mapEntityToModel(entity) : null;
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.usersRepository.delete(id);
  }
}
