import { Router, Request, Response } from 'express';
import { createJwt, isPasswordCorrect } from '../services/auth.service';
import { rateLimit } from 'express-rate-limit';

const router = Router();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

router.use(limiter);

router.post('/password', (req: Request, res: Response) => {
  if (!req.body) return;

  if (isPasswordCorrect(req.body.password)) {
    const jwt = createJwt();
    res.status(201);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ token: jwt }));
  } else {
    res.status(401);
  }
});

export default router;
