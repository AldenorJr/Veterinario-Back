import { Request, Response } from "express";
import { UpdateUserService } from "../../service/user/UpdateUserService";

class UpdateUserController {
    async handle(req: Request, res: Response) {
        const id = req.user_id as string;
        const { name, nickname, email, password } = req.body;
        const updateUserService = new UpdateUserService();
        const user = await updateUserService.execute({id, name, nickname, email, password});
        return res.json(user);
    }
}

export { UpdateUserController }