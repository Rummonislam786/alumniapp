import { EventRegService } from "../../business/services/EventRegService";
import { Request, Response } from "express";
import { ApiResponse } from "@monorepo/types";

export class EventRegController {
  private eventRegService: EventRegService;
  constructor() {
    this.eventRegService = new EventRegService();
  }
  getAllEventReg = async (req: Request, res: Response) => {
    try {
      const eventregs = await this.eventRegService.getAllEventRegs();
      const response: ApiResponse<typeof eventregs> = {
        success: true,
        data: eventregs,
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
  getEventRegById = async (req: Request, res: Response) => {
    try {
      const reg_id = parseInt(req.params.reg_id);
      const eventreg = await this.eventRegService.getEventRegById(reg_id);
      if (!eventreg) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Event Registration not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof eventreg> = {
        success: true,
        data: eventreg,
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
  getEventRegByEventId = async (req: Request, res: Response) => {
    try {
      const event_id = parseInt(req.params.event_id);
      const eventreg =
        await this.eventRegService.getEventRegByEventId(event_id);
      if (!eventreg) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Event Registration not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof eventreg> = {
        success: true,
        data: eventreg,
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
  getEventRegByAlumniId = async (req: Request, res: Response) => {
    try {
      const alumni_id = parseInt(req.params.alumni_id);
      const eventreg =
        await this.eventRegService.getEventRegByAlumniId(alumni_id);
      if (!eventreg) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Event Registration not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof eventreg> = {
        success: true,
        data: eventreg,
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
  createEventReg = async (req: Request, res: Response) => {
    try {
      const eventreg = await this.eventRegService.createEventReg(req.body);
      const response: ApiResponse<typeof eventreg> = {
        success: true,
        data: eventreg,
        message: "Event Registration created successfully",
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
  updateEventReg = async (req: Request, res: Response) => {
    try {
      const reg_id = parseInt(req.params.reg_id);
      const eventreg = await this.eventRegService.updateEventReg(
        reg_id,
        req.body,
      );
      if (!eventreg) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Event not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<typeof eventreg> = {
        success: true,
        data: eventreg,
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
  deleteEventReg = async (req: Request, res: Response) => {
    try {
      const reg_id = parseInt(req.params.event_id);
      const deleted = await this.eventRegService.deleteEventReg(reg_id);
      if (!deleted) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Event Registration not found",
        };
        return res.status(404).json(response);
      }
      const response: ApiResponse<never> = {
        success: true,
        message: "Event Registration deleted successfully",
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
// export class EventController {
//   private eventService: EventService;
//   constructor() {
//     this.eventService = new EventService();
//   }
//   getAllEvent = async (req: Request, res: Response) => {
//     try {
//       const events = await this.eventService.getAllEvent();
//       const response: ApiResponse<typeof events> = {
//         success: true,
//         data: events,
//       };
//       res.json(response);
//     } catch (error) {
//       const response: ApiResponse<never> = {
//         success: false,
//         error: error instanceof Error ? error.message : "Unknown error",
//       };
//       res.status(500).json(response);
//     }
//   };
//   getEventById = async (req: Request, res: Response) => {
//     try {
//       const event_id = parseInt(req.params.event_id);
//       const event = await this.eventService.getEventById(event_id);
//       if (!event) {
//         const response: ApiResponse<never> = {
//           success: false,
//           error: "Event not found",
//         };
//         return res.status(404).json(response);
//       }
//       const response: ApiResponse<typeof event> = {
//         success: true,
//         data: event,
//       };
//       res.json(response);
//     } catch (error) {
//       const response: ApiResponse<never> = {
//         success: false,
//         error: error instanceof Error ? error.message : "Unknown error",
//       };
//       res.status(500).json(response);
//     }
//   };
//   createEvent = async (req: Request, res: Response) => {
//     try {
//       const event = await this.eventService.createEvent(req.body);
//       const response: ApiResponse<typeof event> = {
//         success: true,
//         data: event,
//         message: "Event created successfully",
//       };
//       res.status(201).json(response);
//     } catch (error) {
//       const response: ApiResponse<never> = {
//         success: false,
//         error: error instanceof Error ? error.message : "Unknown error",
//       };
//       res.status(500).json(response);
//     }
//   };
//   updateEvent = async (req: Request, res: Response) => {
//     try {
//       const event_id = parseInt(req.params.event_id);
//       const event = await this.eventService.updateEvent(event_id, req.body);
//       if (!event) {
//         const response: ApiResponse<never> = {
//           success: false,
//           error: "Event not found",
//         };
//         return res.status(404).json(response);
//       }
//       const response: ApiResponse<typeof event> = {
//         success: true,
//         data: event,
//         message: "Event updated successfully",
//       };
//       res.json(response);
//     } catch (error) {
//       const response: ApiResponse<never> = {
//         success: false,
//         error: error instanceof Error ? error.message : "Unknown error",
//       };
//       res.status(500).json(response);
//     }
//   };
//   deleteEvent = async (req: Request, res: Response) => {
//     try {
//       const event_id = parseInt(req.params.event_id);
//       const deleted = await this.eventService.deleteEvent(event_id);
//       if (!deleted) {
//         const response: ApiResponse<never> = {
//           success: false,
//           error: "Event not found",
//         };
//         return res.status(404).json(response);
//       }
//       const response: ApiResponse<never> = {
//         success: true,
//         message: "Event deleted successfully",
//       };
//       res.json(response);
//     } catch (error) {
//       const response: ApiResponse<never> = {
//         success: false,
//         error: error instanceof Error ? error.message : "Unknown error",
//       };
//       res.status(500).json(response);
//     }
//   };
// }
