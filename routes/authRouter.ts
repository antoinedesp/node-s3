import express from 'express';
import AuthController from '../controllers/AuthController';

const authRouter = express.Router();

authRouter.get('/login', (req, res) => {
    res.render('auth/login');
  });

  authRouter.get('/register', (req, res) => {
    res.render('auth/register');
  });
  

// Route: POST /auth/login
authRouter.post('/login', AuthController.login);

// Route: POST /auth/register
authRouter.post('/register', AuthController.register);

// Route: POST /auth/logout
authRouter.get('/logout', AuthController.logout);

export default authRouter;
