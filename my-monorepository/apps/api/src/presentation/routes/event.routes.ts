import { Router } from "express";
import { EventController } from "../controllers/EventController";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();
const eventController = new EventController();

const createEventValidation = [
  body("event_name").notEmpty().withMessage("Event Name is Required"),
  body("event_type").notEmpty().withMessage("Event Type is Required"),
  body("event_date")
    .notEmpty()
    .withMessage("Event Date is required, else when there's gonna be event."),
  body("event_time").notEmpty().withMessage("Event Time is Required"),
];
const updateEventValidation = [
  body("event_name")
    .notEmpty()
    .optional()
    .withMessage("Event Name is Required"),
  body("event_type")
    .notEmpty()
    .optional()
    .withMessage("Event Type is Required"),
  body("event_date")
    .notEmpty()
    .optional()
    .withMessage("Event Date is required, else when there's gonna be event."),
  body("event_time")
    .notEmpty()
    .optional()
    .withMessage("Event Time is Required"),
];

router.get("/", eventController.getAllEvent);
router.get("/:event_id", eventController.getEventById);
router.post("/", createEventValidation, eventController.createEvent);
router.put("/:event_id", updateEventValidation, eventController.updateEvent);
router.delete("/:event_id", eventController.deleteEvent);
