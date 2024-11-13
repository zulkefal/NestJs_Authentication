import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerAccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('Customer Middleware');
    // const {authorization} = req.headers;
    // if(!authorization || authorization !== '123456'){
    //   res.status(401).send('Unauthorized');}
      
    // next();
  }
}