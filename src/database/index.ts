import makeRelations from './relations';
import Database from './Database';

export async function verifyConnection() {
  Database.authenticate()
    .then(() => {
      makeRelations();
      console.log('Database connected');
    })
    .catch((error) => {
      console.error('Error connecting to database:', error);
      process.exit(1);
    });
}

export default Database;
