import { JwtPayload } from "jsonwebtoken"; 

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}
}

export interface MyJwtPayload {
    id: number;
    isAdmin: boolean;
}
