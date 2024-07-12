import express from 'express';
import DashboardController from '../controllers/DashboardController';
import { isLoggedIn } from '../middlewares/authMiddleware';

const dashboardRouter = express.Router();

dashboardRouter.get('/', isLoggedIn, DashboardController.home);

export default dashboardRouter;
