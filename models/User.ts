import { Model, DataTypes, ModelStatic } from 'sequelize';
import sequelize from './instance';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    this.hasMany(models.Furniture, { foreignKey: 'userId' });
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'users',
});

export default User;
