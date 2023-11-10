import { Request, Response } from "express";
import { DetailUserService } from "../../service/user/DetailUserService";

class DetailUserController {
    async handle(req: Request, res: Response) {
        const id = req.params.id;
        const detailUserService = new DetailUserService();
        const user = await detailUserService.execute({id});
        return res.json(user);
    }
}

export { DetailUserController }