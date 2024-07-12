import { Model, DataTypes } from 'sequelize';
import sequelize from './instance';

class Material extends Model {
  public id!: number;
  public name!: string;
  public supplierId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

    // Define associations in static method
    public static associate(models: any): void {
      Material.belongsToMany(models.Keyword, {
        through: 'MaterialKeyword',
        foreignKey: 'materialId',
        as: 'keywords',
      });
    }

    public async setMaterials(materialIds: number[]): Promise<void> {
      try {
        await this.set('materials', materialIds);
      } catch (error) {
        console.error('Error setting materials:', error);
        throw error;
      }
    }
  
    public async addMaterials(materialIds: number[]): Promise<void> {
      try {
        const _materialIds = await this.get('materials') as number[];

        await this.set('materials', [..._materialIds, ...materialIds]);
      } catch (error) {
        console.error('Error adding materials:', error);
        throw error;
      }
    }
  
    public async setKeywords(keywordIds: number[]): Promise<void> {
      try {
        await this.set('keywords', keywordIds);
      } catch (error) {
        console.error('Error setting keywords:', error);
        throw error;
      }
    }
  
    public async addKeywords(keywordIds: number[]): Promise<void> {
      try {
      const _keywordsIds = await this.get('keywords') as number[];

        await this.set('keywords', [..._keywordsIds, ...keywordIds]);
      } catch (error) {
        console.error('Error adding keywords:', error);
        throw error;
      }
    }
}


Material.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  supplierId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'materials',
});

export default Material;
