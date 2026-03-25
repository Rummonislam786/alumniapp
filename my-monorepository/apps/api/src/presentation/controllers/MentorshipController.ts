import { MentorshipServices } from "../../business/services/MentorshipService";
import { Request, Response } from "express";
import { ApiResponse } from "@monorepo/types";

export class MentorshipController {
  private mentorshipService: MentorshipServices;
  constructor() {
    this.mentorshipService = new MentorshipServices();
  }
  getAllMentorship = async (req: Request, res: Response) => {
    try {
      const mentorship = await this.mentorshipService.getAllMentorship();
      const response: ApiResponse<typeof mentorship> = {
        success: true,
        data: mentorship,
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
  getMentorShipById = async (req: Request, res: Response) => {
    try {
      const mentorship_id = parseInt(req.params.mentorship_id);
      const mentorship =
        await this.mentorshipService.getMentorShipById(mentorship_id);
      if (!mentorship) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Mentorship not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof mentorship> = {
        success: true,
        data: mentorship,
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
  getMentorshipByMenteeId = async (req: Request, res: Response) => {
    try {
      const mentee_alumni_id = parseInt(req.params.mentee_alumni_id);
      const mentorship =
        await this.mentorshipService.getMentorshipByMenteeId(mentee_alumni_id);
      if (!mentorship) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Mentorship not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof mentorship> = {
        success: true,
        data: mentorship,
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
  getMentorshipByMentorId = async (req: Request, res: Response) => {
    try {
      const mentor_id = parseInt(req.params.mentor_id);
      const mentorship =
        await this.mentorshipService.getMentorshipByMentorId(mentor_id);
      if (!mentorship) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Mentorship not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof mentorship> = {
        success: true,
        data: mentorship,
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
  createMentorship = async (req: Request, res: Response) => {
    try {
      const mentorship = await this.mentorshipService.createMentorship(
        req.body,
      );
      const response: ApiResponse<typeof mentorship> = {
        success: true,
        data: mentorship,
        message: "Mentorship created successfully",
      };
      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(500).json(response);
    }
  };
  updateMentorship = async (req: Request, res: Response) => {
    try {
      const mentorship_id = parseInt(req.params.mentorship_id);
      const mentorship = await this.mentorshipService.updateMentorship(
        mentorship_id,
        req.body,
      );
      if (!mentorship) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Mentorship not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof mentorship> = {
        success: true,
        data: mentorship,
        message: "Mentorship updated successfully",
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
  deleteMentorship = async (req: Request, res: Response) => {
    try {
      const mentorship_id = parseInt(req.params.mentorship_id);
      const deleted =
        await this.mentorshipService.deleteMentorship(mentorship_id);
      if (!deleted) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Mentorship not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<never> = {
        success: true,
        message: "Mentorship deleted successfully",
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
