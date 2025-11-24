import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export interface AuthUser {
  id: string;
  username: string;
  [key: string]: any;
}

// This function builds a user object from an authorization header (used by REST and GraphQL contexts)
export async function buildContextFromReq({ authorization }: { authorization?: string | null | undefined }) {
  if (!authorization) return null;
  try {
    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET) as any;
    return { id: payload.id, username: payload.username };
  } catch (e) {
    return null;
  }
}

// Express middleware (optional) — attaches user to req
export async function jwtAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  const user = await buildContextFromReq({ authorization: auth });
  (req as any).user = user;
  next();
}

export default jwtAuthMiddleware;
