import { Request, Response } from 'express';
import { TaskService } from '../../business/services/TaskService';
import { ApiResponse, TaskStatus } from '@monorepo/types';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  getAllTasks = async (req: Request, res: Response) => {
    try {
      const { userId, status } = req.query;
      
      let tasks;
      if (userId) {
        tasks = await this.taskService.getTasksByUserId(parseInt(userId as string));
      } else if (status) {
        tasks = await this.taskService.getTasksByStatus(status as TaskStatus);
      } else {
        tasks = await this.taskService.getAllTasks();
      }

      const response: ApiResponse<typeof tasks> = {
        success: true,
        data: tasks
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  };

  getTaskById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const task = await this.taskService.getTaskById(id);
      
      if (!task) {
        const response: ApiResponse<never> = {
          success: false,
          error: 'Task not found'
        };
        return res.status(404).json(response);
      }

      const response: ApiResponse<typeof task> = {
        success: true,
        data: task
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  };

  createTask = async (req: Request, res: Response) => {
    try {
      const task = await this.taskService.createTask(req.body);
      const response: ApiResponse<typeof task> = {
        success: true,
        data: task,
        message: 'Task created successfully'
      };
      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(400).json(response);
    }
  };

  updateTask = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const task = await this.taskService.updateTask(id, req.body);
      
      if (!task) {
        const response: ApiResponse<never> = {
          success: false,
          error: 'Task not found'
        };
        return res.status(404).json(response);
      }

      const response: ApiResponse<typeof task> = {
        success: true,
        data: task,
        message: 'Task updated successfully'
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(400).json(response);
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.taskService.deleteTask(id);
      
      if (!deleted) {
        const response: ApiResponse<never> = {
          success: false,
          error: 'Task not found'
        };
        return res.status(404).json(response);
      }

      const response: ApiResponse<never> = {
        success: true,
        message: 'Task deleted successfully'
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  };
}
