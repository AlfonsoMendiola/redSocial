import { Router } from "express";

import { check } from "express-validator";
import { validarCampos } from "../../middlewares/validar-campos.mjs";
import { validarJWT } from "../../middlewares/validar-jwt.mjs";
import { authController } from "./auth-controller.mjs";

const authRouter = Router();
authRouter.get('/renovar-token', validarJWT, authController.renovarToken)
authRouter.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('pass', 'el pass es obligatorio').not().isEmpty(),
    validarCampos
], authController.login);


export { authRouter }