import { Role } from "@prisma/client"
import prismaClient from "../../prisma"

interface AccountChangedEvent{
    user_id: string
    permission_account: Role
}

class ChangePermissionService {
    async execute({user_id, permission_account}: AccountChangedEvent) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        })
        if(!user) throw new Error(`User ${user_id} does not exist`)
        if(user.role === permission_account) throw new Error(`Permission account ${permission_account} is already`);
        await prismaClient.user.update({
            where: {
                id: user_id
            },
            data: {
                role: permission_account
            }
        })

    }   
}

export { ChangePermissionService }