// import bcrypt from "bcrypt";
// import { User, CreateUserDto, UpdateUserDto } from "@monorepo/types";
// import { UserRepository } from "../../data/repositories/UserRepository";
// import { UserEntity } from "../../data/entities/User.entity";

// export class UserService {
//   private userRepository: UserRepository;

//   constructor() {
//     this.userRepository = new UserRepository();
//   }

//   private mapEntityToModel(entity: UserEntity): User {
//     return {
//       id: entity.id,
//       email: entity.email,
//       name: entity.name,
//       createdAt: entity.createdAt,
//       updatedAt: entity.updatedAt,
//     };
//   }

//   async getAllUsers(): Promise<User[]> {
//     const entities = await this.userRepository.findAll();
//     return entities.map(this.mapEntityToModel);
//   }

//   async getUserById(id: number): Promise<User | null> {
//     const entity = await this.userRepository.findById(id);
//     return entity ? this.mapEntityToModel(entity) : null;
//   }

//   async createUser(dto: CreateUserDto): Promise<User> {
//     // Check if user already exists
//     const existingUser = await this.userRepository.findByEmail(dto.email);
//     if (existingUser) {
//       throw new Error("User with this email already exists");
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(dto.password, 10);

//     // Create user
//     const entity = await this.userRepository.create({
//       email: dto.email,
//       name: dto.name,
//       password: hashedPassword,
//     });

//     return this.mapEntityToModel(entity);
//   }

//   async updateUser(id: number, dto: UpdateUserDto): Promise<User | null> {
//     // Check if user exists
//     const existingUser = await this.userRepository.findById(id);
//     if (!existingUser) {
//       return null;
//     }

//     // Check email uniqueness if updating email
//     if (dto.email && dto.email !== existingUser.email) {
//       const userWithEmail = await this.userRepository.findByEmail(dto.email);
//       if (userWithEmail) {
//         throw new Error("Email already in use");
//       }
//     }

//     const entity = await this.userRepository.update(id, dto);
//     return entity ? this.mapEntityToModel(entity) : null;
//   }

//   async deleteUser(id: number): Promise<boolean> {
//     return this.userRepository.delete(id);
//   }
// }
import { UserEntity } from "../../data/entities/Users.entity";
import { UserRepository } from "../../data/repositories/UsersRepository";
