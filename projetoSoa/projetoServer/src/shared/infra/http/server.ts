import 'dotenv/config';
import 'reflect-metadata';

import { errors } from 'celebrate';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import AppError from '../../errors/AppError';
import routes from './routes';

import '../../typeorm/index';
import {
  MEDICO_API_URL,
  PACIENTE_API_URL,
  TIMESLOT_API_URL,
} from './servicesUrl';
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
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
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

// GATEWAY CONFIG
const optionsPaciente = {
  target: PACIENTE_API_URL,
  changeOrigin: true,
  logger: console,
};

const optionsMedico = {
  target: MEDICO_API_URL,
  changeOrigin: true,
  logger: console,
};

const optionsTimeslot = {
  target: TIMESLOT_API_URL,
  changeOrigin: true,
  logger: console,
};

const proxyPaciente = createProxyMiddleware(optionsPaciente);
const proxyMedico = createProxyMiddleware(optionsMedico);
const proxyTimeslot = createProxyMiddleware(optionsTimeslot);

app.get('/patients', proxyPaciente);
app.get('/doctors', proxyMedico);
app.get('/timeslots', proxyTimeslot);



app.listen(PORT, () => {
  console.log(`🚀 Server started at port ${PORT}`);
});
