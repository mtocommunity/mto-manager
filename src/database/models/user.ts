import { DataTypes, Model } from 'sequelize';
import Database from '../Database';
import UserProfile from './user_profile';

class User extends Model {
  declare user_id: string;
  declare discord_id: string;
  declare user_code: string;
  declare email: string;
  declare username: string;
  declare verified: boolean;
  declare profile?: UserProfile;
  declare verifyCode?: any;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    discord_id: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      unique: true
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
