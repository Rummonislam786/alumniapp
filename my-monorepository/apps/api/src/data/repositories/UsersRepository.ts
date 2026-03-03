import { Repository } from "typeorm";
import { AppDataSource } from "../database";

import { UserEntity } from "../entities/Users.entity";

export class UsersRepository {
  private repository = AppDataSource.getRepository(UserEntity);

  // export class UserRepository {
  //   private repository: Repository<UserEntity>;
  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }
  //   constructor() {
  //     this.repository = AppDataSource.getRepository(UserEntity);
  //   }
  async findAll(): Promise<UserEntity[]> {
    console.log("Finding all users in the database...");
    return this.repository.find();
  }
  //   async findAll(): Promise<UserEntity[]> {
  //     return this.repository.find();
  //   }
  async findById(user_id: number): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { user_id } });
  }
  //   async findById(id: number): Promise<UserEntity | null> {
  //     return this.repository.findOne({ where: { id } });
  //   }
  async findbyAlumniId(alumni_id: number): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { alumni: { alumni_id } } });
  }
  //   async findByEmail(email: string): Promise<UserEntity | null> {
  //     return this.repository.findOne({ where: { email } });
  //   }
  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }
  //   async create(data: Partial<UserEntity>): Promise<UserEntity> {
  //     const user = this.repository.create(data);
  //     return this.repository.save(user);
  //   }
  async update(
    user_id: number,
    data: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    await this.repository.update(user_id, data);
    return this.findById(user_id);
  }

  //   async update(id: number, data: Partial<UserEntity>): Promise<UserEntity | null> {
  //     await this.repository.update(id, data);
  //     return this.findById(id);
  //   }
  async delete(user_id: number): Promise<boolean> {
    const result = await this.repository.delete(user_id);
    return (result.affected ?? 0) > 0;
  }
  //   async delete(id: number): Promise<boolean> {
  //     const result = await this.repository.delete(id);
  //     return (result.affected ?? 0) > 0;
  //   }
  // }
}
