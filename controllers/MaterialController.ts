import { NextFunction, Request, Response } from 'express';
import Material from '../models/Material';
import Supplier from '../models/Supplier';

const MaterialController = {
  async index(req: Request, res: Response) {
    try {
      const materials = await Material.findAll();
      res.render('material/index', { materials });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async addForm(req: Request, res: Response, next: NextFunction) {
    try {
      const suppliers = await Supplier.findAll(); // Fetch all suppliers from database
      console.log(suppliers);
      res.render('material/add', { suppliers }); // Render the add material form with suppliers data
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');    
    }
  },

  async add(req: Request, res: Response) {
    try {
      const { name, supplierId } = req.body;
      const material = await Material.create({ name, supplierId });
      res.redirect('/material');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async editForm(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const material = await Material.findByPk(id);
      
      if (!material) {
        return res.status(404).send('Material not found');
      }

      const suppliers = await Supplier.findAll();
      
      if (!suppliers) {
        return res.status(404).send('Suppliers not found');
      }

      res.render('material/edit', { material, suppliers });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, supplierId } = req.body;

      const material = await Material.findByPk(id);

      if (!material) {
        return res.status(404).send('Material not found');
      }

      await material.update({ name, supplierId });
      res.redirect('/material');

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const material = await Material.findByPk(id);
      if (!material) {
        return res.status(404).send('Material not found');
      }
      await material.destroy();
      res.redirect('/material');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

export default MaterialController;
