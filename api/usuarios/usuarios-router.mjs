
import { Router } from 'express';

import { usuariosController } from './usuarios-controller.mjs';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validar-campos.mjs';
import { validarJWT } from '../../middlewares/validar-jwt.mjs';

const usuariosRouter = Router();

usuariosRouter.post('/', [
    validarJWT,
    //check('campo', 'El campo es obligatorio').not().isEmpty(),
    validarCampos
], usuariosController.post);

usuariosRouter.get('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], usuariosController.get)

usuariosRouter.get('/', [
    validarJWT
], usuariosController.gets)

usuariosRouter.put('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], usuariosController.update)

usuariosRouter.delete('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], usuariosController.delete)

export { usuariosRouter }
    