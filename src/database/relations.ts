import VerifyCode from './models/verify_code';
import User from './models/user';
import UserTeam from './models/user_team';
import Team from './models/team';

export default function makeRelations() {
  User.hasOne(VerifyCode, {
    sourceKey: 'discord_id',
    foreignKey: 'discord_id',
    as: 'verifyCode'
  });

  VerifyCode.belongsTo(User, {
    targetKey: 'discord_id',
    foreignKey: 'discord_id',
    as: 'user'
  });

  User.belongsToMany(Team, {
    through: UserTeam,
    sourceKey: 'user_id',
    foreignKey: 'user_id',
    as: 'teams'
  });

  Team.belongsToMany(User, {
    through: UserTeam,
    sourceKey: 'team_id',
    foreignKey: 'team_id',
    as: 'members'
  });

  console.log('Tablas relacionadas exitósamente');
}
