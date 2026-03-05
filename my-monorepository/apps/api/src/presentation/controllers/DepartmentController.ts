// import { Request, Response } from "express";
// import { UsersService } from "../../business/services/UsersService";
// import { ApiResponse } from "@monorepo/types";
import { DepartmentService } from "../../business/services/DepartmentService";
import { Request, Response } from "express";
import { ApiResponse } from "@monorepo/types";
import { create } from "domain";

export class DepartmentController {
  private departmentService: DepartmentService;

  constructor() {
    this.departmentService = new DepartmentService();
  }

  getAllDepartments = async (req: Request, res: Response) => {
    try {
      console.log("Fetching all departments...");
      const departments = await this.departmentService.getAllDepartments();
      const response: ApiResponse<typeof departments> = {
        success: true,
        data: departments,
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
  getDepartmentById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const department = await this.departmentService.getDepartmentById(id);
      if (!department) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Department not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof department> = {
        success: true,
        data: department,
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

  getDepartmentByCode = async (req: Request, res: Response) => {
    try {
      const dept_code = req.params.dept_code;
      const department =
        await this.departmentService.getDepartmentByCode(dept_code);
      if (!department) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Department not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof department> = {
        success: true,
        data: department,
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

  createDepartment = async (req: Request, res: Response) => {
    try {
      const department = await this.departmentService.createDepartment(
        req.body,
      );
      const response: ApiResponse<typeof department> = {
        success: true,
        data: department,
        message: "Department created successfully",
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

  updateDepartment = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const department = await this.departmentService.updateDepartment(
        id,
        req.body,
      );
      if (!department) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Department not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof department> = {
        success: true,
        data: department,
        message: "Department updated successfully",
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

  deleteDepartment = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.departmentService.deleteDepartment(id);
      if (!deleted) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Department not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<never> = {
        success: true,
        message: "Department deleted successfully",
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
