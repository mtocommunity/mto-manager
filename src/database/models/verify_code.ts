import { DataTypes, Model } from 'sequelize';
import Database from '../../database';

class VerifyCode extends Model {
  declare user_id: string;
  declare code: string;
}

VerifyCode.init(
  {
    user_id: {
      type: DataTypes.CHAR(18),
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
    tableName: 'verify_codes',
    timestamps: false
  }
);

export default VerifyCode;
