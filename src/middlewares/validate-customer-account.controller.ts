import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ValidateCustomerAccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Middleware');
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send('Unauthorized');
    }

    const token = authorization.split(' ')[1]; // Assuming the token is in the format "Bearer <token>"

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(!decoded){
        return res.status(401).send('Unauthorized');
      }
      next();
    } catch (err) {
      return res.status(401).send('Unauthorized');
    }
  }
}