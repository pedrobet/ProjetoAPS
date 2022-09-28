import { createConnections } from 'typeorm';

createConnections([
  {
    name: 'mongo',
    type: 'mongodb',
    host: 'mongo-paciente',
    port: 27016,
    url: 'mongodb://mongo-paciente:27016/projetoAPS',
    useUnifiedTopology: true,
    entities: ['./src/modules/**/infra/database/schemas/*.ts'],
  },
]).then(() => console.log('🍃 TypeORM is connected'));
