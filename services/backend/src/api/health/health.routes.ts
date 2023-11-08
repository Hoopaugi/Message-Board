import { Router } from "express";

import healthHandlers from "./health.handlers";

const router = Router()

router.get('/', healthHandlers.pong)

export default router
