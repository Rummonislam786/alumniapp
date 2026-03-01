import { Request, Response } from "express";
import { UserService } from "../../business/services/UsersService";
import { ApiResponse } from "@monorepo/types";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      const response: ApiResponse<typeof users> = {
        success: true,
        data: users,
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(500).json(response);
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.getUserById(id);

      if (!user) {
        const response: ApiResponse<never> = {
          success: false,
          error: "User not found",
        };
        return res.status(404).json(response);
      }

      const response: ApiResponse<typeof user> = {
        success: true,
        data: user,
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(500).json(response);
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.createUser(req.body);
      const response: ApiResponse<typeof user> = {
        success: true,
        data: user,
        message: "User created successfully",
      };
      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(400).json(response);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.updateUser(id, req.body);

      if (!user) {
        const response: ApiResponse<never> = {
          success: false,
          error: "User not found",
        };
        return res.status(404).json(response);
      }

      const response: ApiResponse<typeof user> = {
        success: true,
        data: user,
        message: "User updated successfully",
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(400).json(response);
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.userService.deleteUser(id);

      if (!deleted) {
        const response: ApiResponse<never> = {
          success: false,
          error: "User not found",
        };
        return res.status(404).json(response);
      }

      const response: ApiResponse<never> = {
        success: true,
        message: "User deleted successfully",
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(500).json(response);
    }
  };
}
