import { createConnections } from 'typeorm';


console.log('HELLO WORLD');

createConnections([{
  name: 'mongo',
  type: 'mongodb',
  host: 'mongo-medico',
  port: 27013,
  url: 'mongodb://mongo-medico:27013/projetoAPS',
  useUnifiedTopology: true,
  entities: ['./src/modules/**/infra/database/schemas/*.ts'],
}]).then(() => console.log('🍃 TypeORM is connected'));
