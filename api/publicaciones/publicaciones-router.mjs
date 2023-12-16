
import { Router } from 'express';

import { publicacionesController } from './publicaciones-controller.mjs';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validar-campos.mjs';
import { validarJWT } from '../../middlewares/validar-jwt.mjs';

const publicacionesRouter = Router();

publicacionesRouter.post('/', [
    validarJWT,
    //check('campo', 'El campo es obligatorio').not().isEmpty(),
    validarCampos
], publicacionesController.post);

publicacionesRouter.get('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], publicacionesController.get)

publicacionesRouter.get('/', [
    validarJWT
], publicacionesController.gets)

publicacionesRouter.put('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], publicacionesController.update)

publicacionesRouter.delete('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], publicacionesController.delete)

export { publicacionesRouter }
    