import { Model, DataTypes } from 'sequelize';
import sequelize from './instance';

class Furniture extends Model {
  public id!: number;
  public name!: string;
  public categoryId!: number;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

    // Define associations in static method
    public static associate(models: any): void {
      this.belongsToMany(models.Material, { through: models.FurnitureMaterial, foreignKey: 'furnitureId' });
      this.belongsToMany(models.Keyword, { through: models.FurnitureKeyword, foreignKey: 'furnitureId' });
      this.belongsTo(models.Category, { foreignKey: 'categoryId' });
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }

}

Furniture.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'furnitures',
});

export default Furniture;
