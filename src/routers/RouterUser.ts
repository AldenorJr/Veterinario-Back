import { Router} from "express";

import { SignUpController } from "../controllers/user/SignUpController";
import { AuthUserController } from "../controllers/user/AuthUserController";
import { UpdateUserController } from "../controllers/user/UpdateUserController";
import { IsAuthenticated } from "../middlewares/IsAuthenticated";
import { DetailUserController } from "../controllers/user/DetailUserController";
import { ChangePermissionController } from "../controllers/user/ChangePermissionController";

const routerUser = Router();

// users
routerUser.post('/user/change/permissions', new ChangePermissionController().handle)
routerUser.post('/user/sign', new SignUpController().handle);
routerUser.post('/user/auth', new AuthUserController().handle);
routerUser.get('/user/me', IsAuthenticated, new DetailUserController().handle);
routerUser.put('/user', IsAuthenticated, new UpdateUserController().handle);

export { routerUser };