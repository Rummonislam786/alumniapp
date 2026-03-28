// import { Router } from "express";
// import { EducationController } from "../controllers/EducationController";
// import { body } from "express-validator";
// import { validateRequest } from "../middleware/validateRequest";
import { Router } from "express";
import { EmploymentController } from "../controllers/EmploymentController";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();
const employmentController = new EmploymentController();

const createEmployementValidation = [
  body("alumni_id").notEmpty().withMessage("Alumni ID required"),
  body("company_name").notEmpty().withMessage("Company Name cannot be Empty"),
  body("job_title")
    .notEmpty()
    .withMessage("One cannot join a company without a job title"),
  body("industry").notEmpty().withMessage("Industry type cannot be empty"),
  body("city").notEmpty().withMessage("City's name is required"),
  body("country")
    .notEmpty()
    .withMessage(
      "A company cannot exist without a Country unless it's on the moon",
    ),
  body("start_date")
    .notEmpty()
    .withMessage("Start Date is missing. Every work has a beginning."),
];

const updateEmployementValidation = [
  body("alumni_id").notEmpty().optional().withMessage("Alumni ID required"),
  body("company_name")
    .notEmpty()
    .optional()
    .withMessage("Company Name cannot be Empty"),
  body("job_title")
    .notEmpty()
    .optional()
    .withMessage("One cannot join a company without a job title"),
  body("industry")
    .notEmpty()
    .optional()
    .withMessage("Industry type cannot be empty"),
  body("city").notEmpty().optional().withMessage("City's name is required"),
  body("country")
    .notEmpty()
    .optional()
    .withMessage(
      "A company cannot exist without a Country unless it's on the moon",
    ),
  body("start_date")
    .notEmpty()
    .optional()
    .withMessage("Start Date is missing. Every work has a beginning."),
];
router.get("/", employmentController.getAllEmployments);
router.get("/:employment_id", employmentController.getEmploymentById);
router.get("/alumni/:alumni_id", employmentController.getEmploymentByAlumniId);
router.get(
  "/cn/:company_name",
  employmentController.getEmploymentByCompanyName,
);
router.get("/jtt/:job_title", employmentController.getEmploymentByJobTitle);
router.get("/inds/:industry", employmentController.getEmploymentByIndustry);
router.get("/city/:city", employmentController.getEmploymentByCity);
router.get("/country/:country", employmentController.getEmploymentByCountry);
router.post(
  "/",
  createEmployementValidation,
  employmentController.createEmployment,
);
router.put(
  "/:employment_id",
  updateEmployementValidation,
  employmentController.updateEmployment,
);
router.delete("/:employment_id", employmentController.deleteEmployment);
