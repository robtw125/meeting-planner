import 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/api.route';

const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(express.json());
app.use('/', express.static('public'));
app.use(cookieParser());
app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`App listening on Port ${PORT}`));
