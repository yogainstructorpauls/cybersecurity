import { Router } from "express";
import { registerClientsController, testController  } from "../controller/clients.controller.js";
import { validate } from "../middleware/validate.js";
const router = Router()

router.post('/register', registerClientsController)
router.get("/test", validate, testController)

export default router