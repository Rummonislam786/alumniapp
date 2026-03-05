import { Router } from "express";
import { AlumniController } from "../controllers/AlumniController";
import { body } from "express-validator/lib/middlewares/validation-chain-builders";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();
const alumniController = new AlumniController();

const createAlumniValidation = [
  // Add validation rules for creating an alumni
  body("student_id").notEmpty().withMessage("Student ID is required"),
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  validateRequest,
];

// Validation middleware
const updateAlumniValidation = [
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  validateRequest,
];

router.get("/", alumniController.getAllAlumni);
router.get("/:id", alumniController.getAlumniById);
router.get("/student/:student_id", alumniController.getAlumniByStudentId);
router.get("/gender/:gender", alumniController.getAlumniByGender);
router.get(
  "/graduation-year/:year",
  alumniController.getAlumniBygraduationYear,
);
router.get("/department/:dept_id", alumniController.getAlumniByDepartment);
router.post("/", createAlumniValidation, alumniController.createAlumni);
router.put("/:id", updateAlumniValidation, alumniController.updateAlumni);
router.delete("/:id", alumniController.deleteAlumni);

export default router;
