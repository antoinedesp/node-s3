import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

class AuthController {
  public static async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ where: { username } });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid password' });
        return;
      }

      // Generate token
      const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
      res.cookie('jwt', token, { httpOnly: true, secure: false }); // Set secure: true in production with HTTPS

      // Redirect
      res.redirect('/dashboard');

    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public static async register(req: Request, res: Response): Promise<void> {
    const { username, password, email } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        res.status(400).json({ message: 'Username already taken' });
        return;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
      });

      // Generate token
      const token = jwt.sign({ userId: newUser.id }, jwtSecret, { expiresIn: '1h' });
      res.cookie('jwt', token, { httpOnly: true, secure: false }); // Set secure: true in production with HTTPS

      // Redirect
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static logout(req: Request, res: Response) {
    req.logout({}, () => {
      res.redirect('/login');
    }); 
  }
}

export default AuthController;
