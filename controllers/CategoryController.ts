import { Request, Response } from 'express';
import Category from '../models/Category';

class CategoryController {
  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      res.status(200).json(category);
    } catch (error) {
      console.error('Error fetching category by id:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public static async create(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    try {
      const newCategory = await Category.create({ name });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      category.name = name;
      await category.save();
      res.status(200).json(category);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      await category.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default CategoryController;
