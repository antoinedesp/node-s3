import { Model, DataTypes } from 'sequelize';
import sequelize from './instance';

class MaterialKeyword extends Model {
  public materialId!: number;
  public keywordId!: number;
}

MaterialKeyword.init({
  materialId: {
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
  tableName: 'material_keywords',
});

export default MaterialKeyword;
