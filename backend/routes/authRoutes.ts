// In authRoutes.ts
import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/authController';
import { verifyToken, isAdmin } from '../middleware/authMiddleware';

const router = Router();

// Register route - no auth needed for registration
router.post('/register', registerUser);

// Login route - no auth needed for login
router.post('/login', loginUser);

// Protected route example - if you need admin-only registration
router.post('/admin/register', verifyToken, isAdmin, registerUser);

export default router;