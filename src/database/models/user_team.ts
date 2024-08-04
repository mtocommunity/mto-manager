import { DataTypes, Model } from 'sequelize';
import { UserTeamRole } from '../../ts';
import Database from '../Database';

class UserTeam extends Model {
  declare user_id: number;
  declare team_id: number;
  declare role: UserTeamRole;
  declare joined_at: Date;
}

UserTeam.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM<UserTeamRole>,
      allowNull: false
    },
    joined_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize: Database,
    timestamps: false,
    tableName: 'user_team'
  }
);

export default UserTeam;
