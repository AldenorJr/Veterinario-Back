import { Router } from "express";
import { routerUser } from "./routers/RouterUser";

const router = Router();

router.use(routerUser)

export { router }