import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface updateProps {
    id: string;
    nickname: string;
    name: string;
    email: string;
    password: string;
}

class UpdateUserService {
    async execute ({id, nickname, name, email, password}: updateProps) {
        const user = await prismaClient.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive'
                }
            }
        })
        if(user) {
            throw new Error('User with email already exists');
        } else {
            const userUpdated = await prismaClient.user.update({
                where: {
                    id: id
                }, 
                data: {
                    email: email,
                    password: password,
                    name: name,
                    updated_At: new Date()
                }
            })
            const token = sign({
                name: userUpdated.name,
                email: userUpdated.email
            }, process.env.JWT_SECRET, {
                subject: userUpdated.id,
                expiresIn: '30d'
            })

            return {
                id: userUpdated.id,
                name: userUpdated.name,
                email: userUpdated.email,
                role: userUpdated.role,
                token: token
            }
        }
    }
}

export { UpdateUserService }