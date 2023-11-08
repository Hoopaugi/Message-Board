import { Router } from "express"

import healthRouter from "./health"

const router = Router()

router.use('/ping', healthRouter)

export default router
