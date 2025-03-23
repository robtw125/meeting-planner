import { Request, Response, Router } from 'express';
import jwtMiddleware from '../middleware/jtw.middleware';
import authRouter from './auth.route';

const router = Router();

router.use('/messages', jwtMiddleware);

router.get('/messages/first', (req: Request, res: Response) => {
  res.header('Content-type', 'text/html');
  res.send(process.env.MESSAGE as string);
});

router.get('/messages/second', (req: Request, res: Response) => {
  res.header('Content-type', 'text/html');
  res.send(process.env.MESSAGE2 as string);
});

router.use('/auth', authRouter);

export default router;
