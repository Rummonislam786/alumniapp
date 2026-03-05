import { Request, Response } from "express";
import { AlumniService } from "../../business/services/AlumniService";
import { ApiResponse, Gender } from "@monorepo/types";

export class AlumniController {
  private alumniService: AlumniService;

  constructor() {
    this.alumniService = new AlumniService();
  }

  getAllAlumni = async (req: Request, res: Response) => {
    try {
      console.log("Fetching all alumni...");
      const alumni = await this.alumniService.getAllAlumni();
      const response: ApiResponse<typeof alumni> = {
        success: true,
        data: alumni,
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

  getAlumniById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const alumni = await this.alumniService.getAlumniById(id);
      if (!alumni) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Alumni not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof alumni> = {
        success: true,
        data: alumni,
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

  getAlumniByStudentId = async (req: Request, res: Response) => {
    try {
      const student_id = req.params.student_id;
      const alumni = await this.alumniService.getAlumniByStudentId(student_id);
      if (!alumni) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Alumni not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof alumni> = {
        success: true,
        data: alumni,
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

  getAlumniByGender = async (req: Request, res: Response) => {
    try {
      const genderParam = req.params.gender;

      // Validate enum value
      if (!Object.values(Gender).includes(genderParam as Gender)) {
        return res.status(400).json({
          success: false,
          error: "Invalid gender value",
        });
      }
      const gender = genderParam as Gender;
      const alumni = await this.alumniService.getAlumniByGender(gender);
      const response: ApiResponse<typeof alumni> = {
        success: true,
        data: alumni,
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

  getAlumniBygraduationYear = async (req: Request, res: Response) => {
    try {
      const year = parseInt(req.params.year);
      const alumni = await this.alumniService.getAlumniBygraduationYear(year);
      const response: ApiResponse<typeof alumni> = {
        success: true,
        data: alumni,
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

  getAlumniByDepartment = async (req: Request, res: Response) => {
    try {
      const dept_id = parseInt(req.params.dept_id);
      const alumni = await this.alumniService.getAlumniByDepartment(dept_id);
      const response: ApiResponse<typeof alumni> = {
        success: true,
        data: alumni,
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

  getAlumniByEmploymentSortedByCompany = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const alumni =
        await this.alumniService.getAlumniByEmploymentSortedByCompany();
      const response: ApiResponse<typeof alumni> = {
        success: true,
        data: alumni,
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

  getAlumniByEmploymentSortedByIndustry = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const alumni =
        await this.alumniService.getAlumniByEmploymentSortedByIndustry();
      const response: ApiResponse<typeof alumni> = {
        success: true,
        data: alumni,
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

  getAlumniByEmploymentSortedByCountry = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const alumni =
        await this.alumniService.getAlumniByEmploymentSortedByCountry();
      const response: ApiResponse<typeof alumni> = {
        success: true,
        data: alumni,
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

  getAlumniByEmploymentCountry = async (req: Request, res: Response) => {
    try {
      const country = req.params.country;
      const alumni =
        await this.alumniService.getAlumniByEmploymentCountry(country);
      const response: ApiResponse<typeof alumni> = {
        success: true,
        data: alumni,
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

  findAlumnibyFieldOfStudy = async (req: Request, res: Response) => {
    try {
      const field_of_study = req.params.field_of_study;
      const alumni =
        await this.alumniService.findAlumnibyFieldOfStudy(field_of_study);
      const response: ApiResponse<typeof alumni> = {
        success: true,
        data: alumni,
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

  createAlumni = async (req: Request, res: Response) => {
    try {
      const alumni = await this.alumniService.createAlumni(req.body);
      const response: ApiResponse<typeof alumni> = {
        success: true,
        data: alumni,
        message: "Alumni created successfully",
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

  updateAlumni = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const alumni = await this.alumniService.updateAlumni(id, req.body);
      if (!alumni) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Alumni not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof alumni> = {
        success: true,
        data: alumni,
        message: "Alumni updated successfully",
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

  deleteAlumni = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.alumniService.deleteAlumni(id);
      if (!deleted) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Alumni not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<never> = {
        success: true,
        message: "Alumni deleted successfully",
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
