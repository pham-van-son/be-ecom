import { join } from 'path';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: '103.110.87.75',
  port: 5480,
  username: 'ecom_user_hongson',
  password: 'ecom_password_hongson',
  database: 'ecom_db',
  entities: [join(__dirname, '../schema/*.entity.{ts,js}')],
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
});
