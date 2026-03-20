import { EmploymentService } from "../../business/services/EmploymentService";
import { Request, Response } from "express";
import { ApiResponse } from "@monorepo/types";
export class EmploymentController {
  private employmentService: EmploymentService;
  constructor() {
    this.employmentService = new EmploymentService();
  }
  getAllEmployments = async (req: Request, res: Response) => {
    try {
      const employments = await this.employmentService.getAllEmployments();
      const response: ApiResponse<typeof employments> = {
        success: true,
        data: employments,
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
  getEmploymentById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.employment_id);
      const employment = await this.employmentService.getEmploymentById(id);
      if (!employment) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Employment not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof employment> = {
        success: true,
        data: employment,
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
  getEmploymentByAlumniId = async (req: Request, res: Response) => {
    try {
      const alumni_id = parseInt(req.params.alumni_id);
      const employment =
        await this.employmentService.getEmploymentByAlumniId(alumni_id);
      if (!employment) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Employment not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof employment> = {
        success: true,
        data: employment,
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
  getEmploymentByCompanyName = async (req: Request, res: Response) => {
    try {
      const company_name = req.params.company_name;
      const employment =
        await this.employmentService.getEmploymentByCompanyName(company_name);
      if (!employment) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Employment not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof employment> = {
        success: true,
        data: employment,
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
  getEmploymentByJobTitle = async (req: Request, res: Response) => {
    try {
      const job_title = req.params.job_title;
      const employment =
        await this.employmentService.getEmploymentByJobTitle(job_title);
      if (!employment) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Employment not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof employment> = {
        success: true,
        data: employment,
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
  getEmploymentByIndustry = async (req: Request, res: Response) => {
    try {
      const industry = req.params.industry;
      const employment =
        await this.employmentService.getEmploymentByIndustry(industry);
      if (!employment) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Employment not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof employment> = {
        success: true,
        data: employment,
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
  getEmploymentByCity = async (req: Request, res: Response) => {
    try {
      const city = req.params.city;
      const employment = await this.employmentService.getEmploymentByCity(city);
      if (!employment) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Employment not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof employment> = {
        success: true,
        data: employment,
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
  getEmploymentByCountry = async (req: Request, res: Response) => {
    try {
      const country = req.params.country;
      const employment =
        await this.employmentService.getEmploymentByCountry(country);
      if (!employment) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Employment not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof employment> = {
        success: true,
        data: employment,
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
  createEmployment = async (req: Request, res: Response) => {
    try {
      const employment = await this.employmentService.createEmployment(
        req.body,
      );
      const response: ApiResponse<typeof employment> = {
        success: true,
        data: employment,
        message: "Employment created successfully",
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
  updateEmployment = async (req: Request, res: Response) => {
    try {
      const employment_id = parseInt(req.params.employment_id);
      const employment = await this.employmentService.updateEmployment(
        employment_id,
        req.body,
      );
      if (!employment) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Employment not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof employment> = {
        success: true,
        data: employment,
        message: "Employment updated successfully",
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
  deleteEmployment = async (req: Request, res: Response) => {
    try {
      const employment_id = parseInt(req.params.employment_id);
      const deleted =
        await this.employmentService.deleteEmployment(employment_id);
      if (!deleted) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Employment not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<never> = {
        success: true,
        message: "Employment deleted successfully",
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
