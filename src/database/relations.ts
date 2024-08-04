import VerifyCode from './models/verify_code';
import User from './models/user';

export default function makeRelations() {
  User.hasOne(VerifyCode, {
    sourceKey: 'user_id',
    foreignKey: 'user_id',
    as: 'verifyCode'
  });

  VerifyCode.belongsTo(User, {
    targetKey: 'user_id',
    foreignKey: 'user_id',
    as: 'user'
  });
  console.log('Tablas relacionadas exitósamente');
}
