import { Model, DataTypes } from 'sequelize';
import sequelize from './instance';

class FurnitureKeyword extends Model {
  public furnitureId!: number;
  public keywordId!: number;
}

FurnitureKeyword.init({
  furnitureId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
  },
  keywordId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize,
  tableName: 'furniture_keywords',
});

export default FurnitureKeyword;
