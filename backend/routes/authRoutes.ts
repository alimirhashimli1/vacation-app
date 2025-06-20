import {Router} from 'express';
import {loginUser, registerUser} from '../controllers/authController';
import {verifyToken, isAdmin} from '../middleware/authMiddleware';

const router = Router();

router.post('/register', registerUser, verifyToken, isAdmin);
router.post('/login', loginUser, verifyToken);

export default router;