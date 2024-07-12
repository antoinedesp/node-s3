import { Model, DataTypes } from 'sequelize';
import sequelize from './instance';

class Supplier extends Model {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
  public static associate(models: any): void {
    this.hasMany(models.Material, { foreignKey:'supplierId' });
  }
}

Supplier.init({
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
  tableName: 'suppliers',
});

export default Supplier;
