import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  // Check if user is authenticated using JWT
  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect('/auth/login');
  }

  jwt.verify(token, jwtSecret, (err: any, decodedToken: any) => {
    if (err) {
      console.log(err);
      return res.redirect('/auth/login');
    }

    console.log('decodedtolen', decodedToken);

    req.user = decodedToken as { userId: number };
    return next();
  });
};

export const setUserAuthentication = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.locals.isAuthenticated = false;
  }

  jwt.verify(token, jwtSecret, (err: any, decodedToken: any) => {
    if (err) {
      res.locals.isAuthenticated = false;
    }

    res.locals.isAuthenticated = true;
    next();
  });
};
