import { Router } from "express"

import handlers from "./users.handlers"

const router = Router()

router.post('/', handlers.create)

export default router
