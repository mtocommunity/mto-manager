import { DataTypes, Model } from 'sequelize';
import Database from '../Database';

class Team extends Model {
  declare team_id: number;
  declare name: string;
  declare displayName: string;
  declare description: string;
  declare member_role_id: string;
  declare leader_role_id: string;
}

Team.init(
  {
    team_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    displayName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'display_name'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    member_role_id: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    leader_role_id: {
      type: DataTypes.CHAR(20),
      allowNull: true
    }
  },
  {
    sequelize: Database,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'team'
  }
);

export default Team;
