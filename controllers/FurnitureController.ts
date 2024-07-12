import { Request, Response } from 'express';
import Furniture from '../models/Furniture';
import Category from '../models/Category';

const FurnitureController = {
  async index(req: Request, res: Response) {
    try {
      const furnitures = await Furniture.findAll();

      const _furnitures = await Promise.all(furnitures.map(async (furniture) => {
        const category = await Category.findByPk(furniture.categoryId)
        return {
          ...furniture.dataValues,
          category
        };
      }));
      console.log('furn:', _furnitures);
      res.render('furniture/index', { furnitures: _furnitures });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async addForm(req: Request, res: Response) {
    const categories = await Category.findAll();
    res.render('furniture/add', { categories });
  },

  async add(req: Request, res: Response) {
    try {
      const { name, categoryId, newCategory } = req.body;

      let _categoryId;

      const userId = 1; // TODO: Fix this once removed the userId colum from the Furniture model
      

      if (newCategory) {
        const createdCategory = await Category.create({ name: newCategory });
        _categoryId = createdCategory.id;
      } else if (categoryId) {
        _categoryId = categoryId;
      }

      const furniture = await Furniture.create({ name, categoryId: _categoryId, userId });

      res.redirect('/furniture');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async editForm(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const furniture = await Furniture.findByPk(id);

      const categories = await Category.findAll();
      
      if (!furniture) {
        return res.status(404).send('Furniture not found');
      }

      res.render('furniture/edit', { furniture, categories });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, categoryId } = req.body;
      const furniture = await Furniture.findByPk(id);
      if (!furniture) {
        return res.status(404).send('Furniture not found');
      }
      await furniture.update({ name, categoryId });
      res.redirect('/furniture');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const furniture = await Furniture.findByPk(id);
      if (!furniture) {
        return res.status(404).send('Furniture not found');
      }
      await furniture.destroy();
      res.redirect('/furniture');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

export default FurnitureController;
