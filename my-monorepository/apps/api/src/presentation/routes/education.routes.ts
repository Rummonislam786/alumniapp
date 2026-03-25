// import { Router } from "express";
// import { DepartmentController } from "../controllers/DepartmentController";
// import { body } from "express-validator";
// import { validateRequest } from "../middleware/validateRequest";
import { Router } from "express";
import { EducationController } from "../controllers/EducationController";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();
const educationController = new EducationController();

// const router = Router();
// const departmentController = new DepartmentController();
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
// const createDepartmentValidation = [
//   body("dept_code").notEmpty().withMessage("Department code is required"),
//   body("name").notEmpty().withMessage("Department name is required"),
//   validateRequest,
// ];
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

// const updateDepartmentValidation = [
//   body("dept_code")
//     .optional()
//     .notEmpty()
//     .withMessage("Department code is required"),
//   body("name").optional().notEmpty().withMessage("Department name is required"),
//   validateRequest,
// ];

// router.get("/", departmentController.getAllDepartments);
// router.get("/:id", departmentController.getDepartmentById);
// router.get("/code/:dept_code", departmentController.getDepartmentByCode);
// router.post(
//   "/",
//   createDepartmentValidation,
//   departmentController.createDepartment,
// );
// router.put(
//   "/:id",
//   updateDepartmentValidation,
//   departmentController.updateDepartment,
// );
// router.delete("/:id", departmentController.deleteDepartment);
