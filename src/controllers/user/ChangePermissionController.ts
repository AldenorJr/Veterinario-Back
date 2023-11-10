import { Request, Response } from "express";
import { ChangePermissionService } from "../../service/user/ChangePermissionService";


class ChangePermissionController {
    async handle(req: Request, res: Response) {
        const { user_id, permission_account } = req.body;
        const changePermission = new ChangePermissionService();
        const handlestatus = changePermission.execute({user_id, permission_account});
        return res.json(handlestatus);
    }
}

export { ChangePermissionController }