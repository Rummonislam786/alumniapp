import { Router } from "express";
import { MentorshipController } from "../controllers/MentorshipController";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();
const mentorshipController = new MentorshipController();

const createMentorshipValidation = [
  body("mentor_id").notEmpty().withMessage("Mentor ID is needed"),
  body("mentee_name").notEmpty().withMessage("Mentee's Name is Required"),
  body("mentee_alumni_id")
    .notEmpty()
    .withMessage("Mentee's alumni ID is needed"),
  body("focus_area")
    .notEmpty()
    .withMessage("We Need to know what area you'll be focusing on"),
  body("start_date").notEmpty().withMessage("Start Date is required"),
];
const updateMentorshipValidation = [
  body("mentor_id").notEmpty().optional().withMessage("Mentor ID is needed"),
  body("mentee_name")
    .notEmpty()
    .optional()
    .withMessage("Mentee's Name is Required"),
  body("mentee_alumni_id")
    .notEmpty()
    .optional()
    .withMessage("Mentee's alumni ID is needed"),
  body("focus_area")
    .notEmpty()
    .optional()
    .withMessage("We Need to know what area you'll be focusing on"),
  body("start_date")
    .notEmpty()
    .optional()
    .withMessage("Start Date is required"),
];
router.get("/", mentorshipController.getAllMentorship);
router.get("/:mentorship_id", mentorshipController.getMentorShipById);
router.get(
  "/mentee/mentee_alumni_id",
  mentorshipController.getMentorshipByMenteeId,
);
router.get("/mentor/:mentor_id", mentorshipController.getMentorshipByMentorId);
router.post("/", mentorshipController.createMentorship);
router.put("/:mentorship_id", mentorshipController.updateMentorship);
router.delete("/:mentorship_id", mentorshipController.deleteMentorship);
