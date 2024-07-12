import { Model, DataTypes } from 'sequelize';
import sequelize from './instance';

class Category extends Model {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    this.hasMany(models.Furniture, { foreignKey: 'categoryId' });
  }
}

Category.init({
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
  tableName: 'categories',
});

export default Category;

