
import { Router } from 'express';

import { redesUsuarioController } from './redesUsuario-controller.mjs';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validar-campos.mjs';
import { validarJWT } from '../../middlewares/validar-jwt.mjs';

const redesUsuarioRouter = Router();

redesUsuarioRouter.post('/', [
    validarJWT,
    //check('campo', 'El campo es obligatorio').not().isEmpty(),
    validarCampos
], redesUsuarioController.post);

redesUsuarioRouter.get('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], redesUsuarioController.get)

redesUsuarioRouter.get('/', [
    validarJWT
], redesUsuarioController.gets)

redesUsuarioRouter.put('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], redesUsuarioController.update)

redesUsuarioRouter.delete('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], redesUsuarioController.delete)

export { redesUsuarioRouter }
    