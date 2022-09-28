import { createConnections } from 'typeorm';


createConnections([{
  name: 'mongo',
  type: 'mongodb',
  host: 'localhost',
  port: 27013,
  url: 'mongodb://localhost:27013/projetoAPS',
  useUnifiedTopology: true,
  entities: ['./src/modules/**/infra/database/schemas/*.ts'],
}]).then(() => console.log('🍃 TypeORM is connected'));
