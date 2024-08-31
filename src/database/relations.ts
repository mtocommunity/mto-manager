import VerifyCode from './models/verify_code';
import User from './models/user';
import UserTeam from './models/user_team';
import Team from './models/team';
import UserProfile from './models/user_profile';
import Technologies from './models/technologies';
import UserProfileTechnologies from './models/user_profile_technologies';

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

  UserProfile.belongsTo(User, {
    targetKey: 'user_id',
    foreignKey: 'user_id',
    as: 'user'
  });

  User.hasOne(UserProfile, {
    sourceKey: 'user_id',
    foreignKey: 'user_id',
    as: 'profile'
  });

  UserProfile.belongsToMany(Technologies, {
    through: UserProfileTechnologies,
    sourceKey: 'user_id',
    foreignKey: 'user_id',
    as: 'technologies',
    timestamps: false
  });

  Technologies.belongsToMany(UserProfile, {
    through: UserProfileTechnologies,
    sourceKey: 'technology_id',
    foreignKey: 'technology_id',
    as: 'users',
    timestamps: false
  });

  UserProfileTechnologies.belongsTo(UserProfile, {
    targetKey: 'user_id',
    foreignKey: 'user_id',
    as: 'profile'
  });

  UserProfileTechnologies.belongsTo(Technologies, {
    targetKey: 'technology_id',
    foreignKey: 'technology_id',
    as: 'technology'
  });

  console.log('Tablas relacionadas exitósamente');
}
