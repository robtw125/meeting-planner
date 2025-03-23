import { Request, Response, NextFunction } from 'express';
import { isJwtValid } from '../services/auth.service';

function extractJwtFromRequest(req: Request): string | null {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
}

function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const jwt = extractJwtFromRequest(req);

  if (jwt && isJwtValid(jwt)) {
    next();
  } else {
    res.status(401);
    res.send();
  }
}

export default jwtMiddleware;
