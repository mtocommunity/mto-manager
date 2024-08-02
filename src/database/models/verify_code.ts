import { DataTypes, Model } from 'sequelize';
import Database from '../Database';

class VerifyCode extends Model {
  declare user_id: string;
  declare code: string;
  declare created_at: Date;
}

VerifyCode.init(
  {
    user_id: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.CHAR(6),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize: Database,
    tableName: 'verification_code',
    timestamps: false
  }
);

export default VerifyCode;
