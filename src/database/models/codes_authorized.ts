import { Model, DataTypes } from 'sequelize';
import Database from '../Database';

class CodesAuthorized extends Model {
  declare code: string;
}

CodesAuthorized.init(
  {
    code: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true
    }
  },
  {
    sequelize: Database,
    tableName: 'codes_authorized'
  }
);

export default CodesAuthorized;
