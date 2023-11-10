import { NextFunction, Request, Response } from "express";
import prismaClient from "../prisma";

export async function IsAutorization(req: Request, res: Response, next: NextFunction) {
    const id = req.user_id as string;
    const user = await prismaClient.user.findFirst({
        where: {
            id: id,
        },
    });
    if(!user) return res.status(401).end();
    const {role} = user;
    if(role === "Administrator") return next(); 
    else return res.status(401).end();
}

export async function IsAutorizationStudant(req: Request, res: Response, next: NextFunction) {
    const id = req.user_id as string;
    const user = await prismaClient.user.findFirst({
        where: {
            id: id
        }, select: {
            role: true
        }
    })
    if(!user) return res.status(401).end();
    const {role} = user;
    if(role === "Administrator" || role === "Studant") return next(); 
    else return res.status(401).end();
}