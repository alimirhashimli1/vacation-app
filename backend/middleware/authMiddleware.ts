// In authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Rename your interface to avoid conflict
interface CustomJwtPayload {
  id: number;
  isAdmin: boolean;
}

// Extend the Express Request interface properly
declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
     res.status(401).json({ message: 'Access denied! No token provided' });
     return;
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Invalid token', error);
     res.status(401).json({ message: 'Invalid or expired token' });
      return; 
  }
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || !req.user.isAdmin) {
     res.status(403).json({ message: 'Access denied! You are not an admin' });
      return; 
  }
  next();
};