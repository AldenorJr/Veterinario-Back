import { Request, Response } from "express";
import { AuthUserService } from "../../service/user/AuthUserService";

class AuthUserController {
    async handle(req: Request, res: Response) {
        const {email, password, captchaToken} = req.body;
        const authUserService = new AuthUserService();
        const userAuth = await authUserService.execute({
            email, 
            password,
            captchaToken
        });
        return res.json(userAuth);
    }
}

export { AuthUserController };