import { DataTypes, Model } from 'sequelize';
import Database from '../Database';
import Technologies from './technologies';
import User from './user';

class UserProfile extends Model {
  declare user_id: number;
  declare bio: string;
  declare url: string;
  declare display_name: string;
  declare display_code: boolean;
  declare level: number;
  declare experience: number;
  declare technologies?: Technologies[];
  declare user?: User;
}

UserProfile.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    display_name: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    display_code: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  { sequelize: Database, timestamps: false, tableName: 'user_profile' }
);

export default UserProfile;
