import 'dotenv/config';
import 'reflect-metadata';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import availableTimesRouter from '@modules/availableTimes/infra/http/routes/availableTimes.routes';
import AppError from '@shared/errors/AppError';

import '../../typeorm/index';

const app = express();

app.use(cors({}));
app.use(express.json());
app.use('/timeslots',availableTimesRouter);
app.use(errors());
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

// with Docker
// const PORT = process.env.PORT || 3000;

// local
const PORT = 3336;

app.listen(PORT, () => {
  console.log(`🚀 Server started at port ${PORT}`);
});
