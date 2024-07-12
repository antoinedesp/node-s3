import { Model, DataTypes } from 'sequelize';
import sequelize from './instance';

class FurnitureMaterial extends Model {
  public furnitureId!: number;
  public materialId!: number;
}

FurnitureMaterial.init({
  furnitureId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
  },
  materialId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize,
  tableName: 'furniture_materials',
});

export default FurnitureMaterial;
