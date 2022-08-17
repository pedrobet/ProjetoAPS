import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import AppError from '../../errors/AppError';
import routes from './routes';

import '@shared/container';

// account key:
import serviceAccount from '../../../../projetoaps.json';

// firebase
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

const app = express();

app.use(cors({}));
app.use(express.json());
app.use(routes);
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

const PORT = process.env.PORT || 3333;

//! configs do firebase
const firebaseConfig = {
  ...serviceAccount,
  apiKey: 'AIzaSyD_mjxB03qGURwxNQQaIHaD2ABkcaXM-fo',
  authDomain: 'projetoaps-f963a.firebaseapp.com',
  projectId: 'projetoaps-f963a',
  storageBucket: 'projetoaps-f963a.appspot.com',
  messagingSenderId: '837966199037',
  appId: '1:837966199037:web:96ee6da8d76c1700482694',
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
});

const firestore = admin.firestore();
fireorm.initialize(firestore);

if (firestore) {
  console.log('🔥 Firestore is connected');
}


app.listen(PORT, () => {
  console.log(`🚀 Server started at port ${PORT}`);
});
