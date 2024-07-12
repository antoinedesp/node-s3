import { Request, Response } from 'express';
import Supplier from '../models/Supplier';

const SupplierController = {
  async index(req: Request, res: Response) {
    try {
      const suppliers = await Supplier.findAll();
      res.render('supplier/index', { suppliers });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  addForm(req: Request, res: Response) {
    res.render('supplier/add');
  },

  async add(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const supplier = await Supplier.create({ name });
      res.redirect('/supplier');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async editForm(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const supplier = await Supplier.findByPk(id);
      if (!supplier) {
        return res.status(404).send('Supplier not found');
      }
      res.render('supplier/edit', { supplier });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const supplier = await Supplier.findByPk(id);
      if (!supplier) {
        return res.status(404).send('Supplier not found');
      }
      await supplier.update({ name });
      res.redirect('/supplier');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const supplier = await Supplier.findByPk(id);
      if (!supplier) {
        return res.status(404).send('Supplier not found');
      }
      await supplier.destroy();
      res.redirect('/supplier');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

export default SupplierController;
