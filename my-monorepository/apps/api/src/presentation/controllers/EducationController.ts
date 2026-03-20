import { EducationService } from "../../business/services/EducationService";
import { Request, Response } from "express";
import { ApiResponse } from "@monorepo/types";

export class EducationController {
  private educationService: EducationService;
  constructor() {
    this.educationService = new EducationService();
  }

  getAllEducation = async (req: Request, res: Response) => {
    try {
      console.log("Fetching all Education");
      const educations = await this.educationService.getAllEducation();
      const response: ApiResponse<typeof educations> = {
        success: true,
        data: educations,
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

  getEducationById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.education_id);
      const educations = await this.educationService.getEducationById(id);
      if (!educations) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Education not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof educations> = {
        success: true,
        data: educations,
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

  getEducationByAlumniId = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const educations = await this.educationService.getEducationByAlumniId(id);
      if (!educations) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Education not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof educations> = {
        success: true,
        data: educations,
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

  getEducationByInstitution = async (req: Request, res: Response) => {
    try {
      const institution = req.params.institution;
      const educations =
        await this.educationService.getEducationByInstitution(institution);
      if (!educations) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Education not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof educations> = {
        success: true,
        data: educations,
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

  getEducationByDegreeTitle = async (req: Request, res: Response) => {
    try {
      const degree_title = req.params.degree_title;
      const educations =
        await this.educationService.getEducationByDegreeTitle(degree_title);
      if (!educations) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Education not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof educations> = {
        success: true,
        data: educations,
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

  getEducationByFieldOfStudy = async (req: Request, res: Response) => {
    try {
      const field_of_study = req.params.field_of_study;
      const educations =
        await this.educationService.getEducationByFieldOfStudy(field_of_study);
      if (!educations) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Education not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof educations> = {
        success: true,
        data: educations,
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

  getEducationByStartYear = async (req: Request, res: Response) => {
    try {
      const start_year = parseInt(req.params.start_year);
      const educations =
        this.educationService.getEducationByStartYear(start_year);
      if (!educations) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Education not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof educations> = {
        success: true,
        data: educations,
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
  getEducationByEndYear = async (req: Request, res: Response) => {
    try {
      const end_year = parseInt(req.params.end_year);
      const educations = this.educationService.getEducationByEndYear(end_year);
      if (!educations) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Education not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof educations> = {
        success: true,
        data: educations,
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

  createEducation = async (req: Request, res: Response) => {
    try {
      const education = await this.educationService.createEducation(req.body);
      const response: ApiResponse<typeof education> = {
        success: true,
        data: education,
        message: "Education created successfully",
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

  updateEducation = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.education_id);
      const education = await this.educationService.updateEducation(
        id,
        req.body,
      );
      if (!education) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Education not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof education> = {
        success: true,
        data: education,
        message: "Education updated successfully",
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

  deleteEducation = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.education_id);
      const deleted = await this.educationService.deleteEducation(id);
      if (!deleted) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Education not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<never> = {
        success: true,
        message: "Education deleted successfully",
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
