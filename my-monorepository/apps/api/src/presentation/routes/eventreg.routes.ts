import { Router } from "express";
import { EventRegController } from "../controllers/EventRegController";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

const eventRegController = new EventRegController();

const createEventRegValidation = [
  body("event_id").notEmpty().withMessage("Please Provide Event ID"),
  body("alumni_id").notEmpty().withMessage("Alumni ID is missing."),
  body("registered_at")
    .notEmpty()
    .withMessage("Need to send when was the registration occured"),
];
const updateEventRegValidation = [
  body("event_id").notEmpty().optional().withMessage("Please Provide Event ID"),
  body("alumni_id").notEmpty().optional().withMessage("Alumni ID is missing."),
  body("registered_at")
    .notEmpty()
    .optional()
    .withMessage("Need to send when was the registration occured"),
];

router.get("/", eventRegController.getAllEventReg);
router.get("/:reg_id", eventRegController.getEventRegById);
router.get("/event/:event_id", eventRegController.getEventRegByAlumniId);
router.get("/alumni/:alumni_id", eventRegController.getEventRegByAlumniId);
router.post("/", eventRegController.createEventReg);
router.put("/:reg_id", eventRegController.updateEventReg);
router.post("/:reg_id", eventRegController.deleteEventReg);
