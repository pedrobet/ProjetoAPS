import { createConnections } from 'typeorm';

createConnections([
  {
    name: 'mongo',
    type: 'mongodb',
    host: 'mongo-timeslot',
    port: 27015,
    url: 'mongodb://mongo-timeslot:27015/projetoAPS',
    useUnifiedTopology: true,
    entities: ['./src/modules/**/infra/database/schemas/*.ts'],
  },
]).then(() => console.log('🍃 TypeORM is connected'));
