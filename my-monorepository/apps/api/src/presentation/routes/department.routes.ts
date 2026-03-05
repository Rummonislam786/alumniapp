// import { Router } from 'express';
// import { UserController } from '../controllers/UserController';
// import { body } from 'express-validator';
// import { validateRequest } from '../middleware/validateRequest';
import { Router } from "express";
import { DepartmentController } from "../controllers/DepartmentController";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();
const departmentController = new DepartmentController();

const createDepartmentValidation = [
  body("dept_code").notEmpty().withMessage("Department code is required"),
  body("name").notEmpty().withMessage("Department name is required"),
  validateRequest,
];

const updateDepartmentValidation = [
  body("dept_code")
    .optional()
    .notEmpty()
    .withMessage("Department code is required"),
  body("name").optional().notEmpty().withMessage("Department name is required"),
  validateRequest,
];

router.get("/", departmentController.getAllDepartments);
router.get("/:id", departmentController.getDepartmentById);
router.get("/code/:dept_code", departmentController.getDepartmentByCode);
router.post(
  "/",
  createDepartmentValidation,
  departmentController.createDepartment,
);
router.put(
  "/:id",
  updateDepartmentValidation,
  departmentController.updateDepartment,
);
router.delete("/:id", departmentController.deleteDepartment);
