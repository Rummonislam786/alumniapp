import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { TaskStatus } from '@monorepo/types';

const router = Router();
const taskController = new TaskController();

// Validation middleware
const createTaskValidation = [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
  body('userId').isInt({ min: 1 }).withMessage('Valid userId is required'),
  validateRequest
];

const updateTaskValidation = [
  body('title').optional().trim().isLength({ min: 1 }).withMessage('Title cannot be empty'),
  body('description').optional().trim().isLength({ min: 1 }).withMessage('Description cannot be empty'),
  body('status').optional().isIn(Object.values(TaskStatus)).withMessage('Invalid status'),
  validateRequest
];

// Routes
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', createTaskValidation, taskController.createTask);
router.put('/:id', updateTaskValidation, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
