import { createConnections } from 'typeorm';

createConnections().then(() => console.log('🍃 TypeORM is connected'));
