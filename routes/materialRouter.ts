import express from 'express';
const router = express.Router();
import MaterialController from '../controllers/MaterialController';

// GET all materials
router.get('/', MaterialController.index);

// GET add form
router.get('/add', MaterialController.addForm);

// POST add material
router.post('/', MaterialController.add);

// GET edit form
router.get('/:id/edit', MaterialController.editForm);

// PUT update material
router.post('/:id/edit', MaterialController.update);

// DELETE material
router.post('/:id/delete', MaterialController.delete);

export default router;
