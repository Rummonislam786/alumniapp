import { Router } from "express";
import { EducationController } from "../controllers/EducationController";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();
const educationController = new EducationController();

const createEducationValidation = [
  body("alumni_id").notEmpty().withMessage("Alumni ID required"),
  body("institution")
    .notEmpty()
    .withMessage(
      "Institution field is empty. An alumni can't have education without an Institution.",
    ),
  body("degree_title")
    .notEmpty()
    .withMessage("Degree Title is empty. Alumni must have a degree title."),
  body("field_of_study")
    .notEmpty()
    .withMessage("Field of Study can't be empty."),
  validateRequest,
];

const updateEducationValidation = [
  body("institution")
    .optional()
    .notEmpty()
    .withMessage(
      "Institution field is empty. An alumni can't have education without an Institution.",
    ),
  body("degree_title")
    .optional()
    .notEmpty()
    .withMessage("Degree Title is empty. Alumni must have a degree title."),
  body("field_of_study")
    .optional()
    .notEmpty()
    .withMessage("Field of Study can't be empty."),
  validateRequest,
];

router.get("/", educationController.getAllEducation);
router.get("/:education_id", educationController.getEducationById);
router.get("/alumni/:alumni_id", educationController.getEducationByAlumniId);
router.get("/ins/:institution", educationController.getEducationByInstitution);
router.get("/dtt/:degree_title", educationController.getEducationByDegreeTitle);
router.get(
  "/fis/:field_of_study",
  educationController.getEducationByFieldOfStudy,
);
router.get("/sy/:start_year", educationController.getEducationByStartYear);
router.get("/ey/:end_year", educationController.getEducationByEndYear);
router.post(
  "/",
  createEducationValidation,
  educationController.createEducation,
);
router.put(
  "/:education_id",
  updateEducationValidation,
  educationController.updateEducation,
);
router.delete("/:education_id", educationController.deleteEducation);
