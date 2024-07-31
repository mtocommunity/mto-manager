import { DataTypes, Model } from 'sequelize';
import Database from '../Database';

class User extends Model {
  declare user_id: string;
  declare user_code: string;
  declare email: string;
  declare username: string;
  declare verified: boolean;
}

User.init(
  {
    user_id: {
      type: DataTypes.CHAR(18),
      allowNull: false,
      primaryKey: true
    },
    user_code: {
      type: DataTypes.CHAR(9),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize: Database,
    tableName: 'user',
    timestamps: false
  }
);

export default User;
