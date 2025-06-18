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
    
}