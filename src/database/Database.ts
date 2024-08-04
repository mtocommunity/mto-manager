import { Sequelize } from 'sequelize';
import Config from '../config';

const Database = new Sequelize(Config.DB.DATABASE, Config.DB.USERNAME, Config.DB.PASSWORD, {
  host: Config.DB.HOST,
  port: Config.DB.PORT,
  dialect: 'mariadb',
  logging: false
});

export default Database;
