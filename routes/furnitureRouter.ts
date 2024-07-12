import express from 'express';
const router = express.Router();
import FurnitureController from '../controllers/FurnitureController';

// GET all furnitures
router.get('/', FurnitureController.index);

// GET add form
router.get('/add', FurnitureController.addForm);

// POST add furniture
router.post('/', FurnitureController.add);

// GET edit form
router.get('/:id/edit', FurnitureController.editForm);

// PUT update furniture
router.put('/:id', FurnitureController.update);

// DELETE furniture
router.delete('/:id', FurnitureController.delete);

export default router;
