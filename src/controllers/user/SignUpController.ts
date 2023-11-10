import { Request, Response } from "express";
import { SignUpService } from "../../service/user/SignUpService";

class SignUpController {
    async handle(req: Request, res: Response) {
        const {name, email, password, captchaToken} = req.body;
        const signUpService = new SignUpService();
        const user = await signUpService.execute({
            name, email, password, captchaToken
        });
        return res.json(user);
    }
}

export { SignUpController };