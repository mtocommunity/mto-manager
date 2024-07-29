import { Sequelize } from 'sequelize';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from '../config';

const Database = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mariadb'
});

export async function connectDatabase() {
  console.log(DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

  Database.sync({
    alter: true,
    logging: false
  })
    .then(() => {
      console.log('Database connected');
    })
    .catch((error) => {
      console.error('Error connecting to database:', error);
      process.exit(1);
    });
}

export default Database;
