import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();
const userController = new UserController();

// Validation middleware
const createUserValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validateRequest
];

const updateUserValidation = [
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  validateRequest
];

// Routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', createUserValidation, userController.createUser);
router.put('/:id', updateUserValidation, userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
