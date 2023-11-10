import prismaClient from "../../prisma";

interface datailProps {
    id: string;
}

class DetailUserService {
    async execute({id}: datailProps) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        })
        if(!user) {
            throw new Error('User not found');
        }
        return user;
    }
}

export { DetailUserService }