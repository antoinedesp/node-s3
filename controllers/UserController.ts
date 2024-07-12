import { Request, Response } from 'express';
import User from '../models/User';

class UserController {
  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user by id:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public static async create(req: Request, res: Response): Promise<void> {
    const { username, password, email } = req.body;
    try {
      const newUser = await User.create({ username, password, email });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { username, password, email } = req.body;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      user.username = username;
      user.password = password; // You might want to hash this password before saving
      user.email = email;
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      await user.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default UserController;
