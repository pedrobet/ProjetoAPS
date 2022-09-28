import { createConnections } from 'typeorm';

createConnections([
  {
    name: 'mongo',
    type: 'mongodb',
    host: 'localhost',
    port: 27016,
    url: 'mongodb://paciente-service:27016/projetoAPS',
    useUnifiedTopology: true,
    entities: ['./src/modules/**/infra/database/schemas/*.ts'],
  },
]).then(() => console.log('🍃 TypeORM is connected'));
