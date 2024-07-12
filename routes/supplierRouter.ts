import express from 'express';
const router = express.Router();
import SupplierController from '../controllers/SupplierController';

// GET all suppliers
router.get('/', SupplierController.index);

// GET add form
router.get('/add', SupplierController.addForm);

// POST add supplier
router.post('/', SupplierController.add);

// GET edit form
router.get('/:id/edit', SupplierController.editForm);

// PUT update supplier
router.post('/:id/edit', SupplierController.update);

// DELETE supplier
router.post('/:id/delete', SupplierController.delete);

export default router;
