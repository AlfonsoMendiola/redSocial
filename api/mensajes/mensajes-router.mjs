
import { Router } from 'express';

import { mensajesController } from './mensajes-controller.mjs';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validar-campos.mjs';
import { validarJWT } from '../../middlewares/validar-jwt.mjs';

const mensajesRouter = Router();

mensajesRouter.post('/', [
    validarJWT,
    //check('campo', 'El campo es obligatorio').not().isEmpty(),
    validarCampos
], mensajesController.post);

mensajesRouter.get('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], mensajesController.get)

mensajesRouter.get('/', [
    validarJWT
], mensajesController.gets)

mensajesRouter.put('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], mensajesController.update)

mensajesRouter.delete('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], mensajesController.delete)

export { mensajesRouter }
    