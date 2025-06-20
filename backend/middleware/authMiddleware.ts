import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    id: number;
    isAdmin: boolean;
}

export const verifyToken = (
    req: Request & { user? : JwtPayload },
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: 'Access denied! No token provided'})
    }
    
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded;
        next()
    } catch (error) {
        console.error('Invalid token', error);
        return res.status(401).json({message: 'Invalid or expired token'})
    }
}

export const isAdmin = (
    req: Request & { user? : JwtPayload},
    res: Response,
    next: NextFunction
) => {
    if(!req.user || !req.user.isAdmin){
        return res.status(403).json({message: 'Access denied! You are not an admin'})
    }
    next()
}