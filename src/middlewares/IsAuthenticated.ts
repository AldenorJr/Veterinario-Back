import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface PayLoad {
    sub: String;
}

export function IsAuthenticated(req: Request, res: Response, next: NextFunction) {
    const autToken = req.headers.authorization;
    
    if(!autToken) {
        return res.status(401).end();
    }

    const [, token] = autToken.split(' '); 
    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;
        req.user_id = sub;
        return next();
    } catch (error) {
        return res.status(401).end();
    }
}