import { EventService } from "../../business/services/EventService";
import { Request, Response } from "express";
import { ApiResponse } from "@monorepo/types";
export class EventController {
  private eventService: EventService;
  constructor() {
    this.eventService = new EventService();
  }
  getAllEvent = async (req: Request, res: Response) => {
    try {
      const events = await this.eventService.getAllEvent();
      const response: ApiResponse<typeof events> = {
        success: true,
        data: events,
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
  getEventById = async (req: Request, res: Response) => {
    try {
      const event_id = parseInt(req.params.event_id);
      const event = await this.eventService.getEventById(event_id);
      if (!event) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Event not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof event> = {
        success: true,
        data: event,
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
  createEvent = async (req: Request, res: Response) => {
    try {
      const event = await this.eventService.createEvent(req.body);
      const response: ApiResponse<typeof event> = {
        success: true,
        data: event,
        message: "Event created successfully",
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
  updateEvent = async (req: Request, res: Response) => {
    try {
      const event_id = parseInt(req.params.event_id);
      const event = await this.eventService.updateEvent(event_id, req.body);
      if (!event) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Event not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof event> = {
        success: true,
        data: event,
        message: "Event updated successfully",
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
  deleteEvent = async (req: Request, res: Response) => {
    try {
      const event_id = parseInt(req.params.event_id);
      const deleted = await this.eventService.deleteEvent(event_id);
      if (!deleted) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Event not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<never> = {
        success: true,
        message: "Event deleted successfully",
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
