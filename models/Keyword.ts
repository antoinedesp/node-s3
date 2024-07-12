import { Model, DataTypes } from 'sequelize';
import sequelize from './instance';

class Keyword extends Model {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any): void {
    this.belongsToMany(models.Furniture, { through: models.FurnitureKeyword, foreignKey: 'keywordId' });
    this.belongsToMany(models.Material, { through: models.MaterialKeyword, foreignKey: 'keywordId' });
  }
}
Keyword.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'keywords',
});

export default Keyword;

