import { Model, DataTypes } from 'sequelize';
import Database from '../Database';
import { TechnologyCategory } from '../../ts';

class Technologies extends Model {
  declare technology_id: number;
  declare extension: string;
  declare category: TechnologyCategory;
  declare name: string;
  declare emoji_id: string;
}

Technologies.init(
  {
    technology_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    extension: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    category: {
      type: DataTypes.ENUM(TechnologyCategory.PROGRAMMING_LANGUAGE, TechnologyCategory.FRAMEWORK, TechnologyCategory.MARKUP_LANGUAGE),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    emoji_id: {
      type: DataTypes.CHAR(20),
      allowNull: true
    }
  },
  {
    sequelize: Database,
    timestamps: false,
    tableName: 'technologies'
  }
);

export default Technologies;
