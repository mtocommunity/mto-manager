import { DataTypes, Model } from 'sequelize';
import Database from '../Database';

class UserProfileTechnologies extends Model {
  user_id!: number;
  technology_id!: number;
}

UserProfileTechnologies.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    technology_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  },
  {
    sequelize: Database,
    tableName: 'user_technologies',
    timestamps: false
  }
);

export default UserProfileTechnologies;
