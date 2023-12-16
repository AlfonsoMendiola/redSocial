
import { Router } from 'express';

import { rolesUsuariosController } from './rolesUsuarios-controller.mjs';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validar-campos.mjs';
import { validarJWT } from '../../middlewares/validar-jwt.mjs';

const rolesUsuariosRouter = Router();

rolesUsuariosRouter.post('/', [
    validarJWT,
    //check('campo', 'El campo es obligatorio').not().isEmpty(),
    validarCampos
], rolesUsuariosController.post);

rolesUsuariosRouter.get('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], rolesUsuariosController.get)

rolesUsuariosRouter.get('/', [
    validarJWT
], rolesUsuariosController.gets)

rolesUsuariosRouter.put('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], rolesUsuariosController.update)

rolesUsuariosRouter.delete('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], rolesUsuariosController.delete)

export { rolesUsuariosRouter }
    