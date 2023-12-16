
import { Router } from 'express';

import { rolesController } from './roles-controller.mjs';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validar-campos.mjs';
import { validarJWT } from '../../middlewares/validar-jwt.mjs';

const rolesRouter = Router();

rolesRouter.post('/', [
    validarJWT,
    //check('campo', 'El campo es obligatorio').not().isEmpty(),
    validarCampos
], rolesController.post);

rolesRouter.get('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], rolesController.get)

rolesRouter.get('/', [
    validarJWT
], rolesController.gets)

rolesRouter.put('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], rolesController.update)

rolesRouter.delete('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], rolesController.delete)

export { rolesRouter }
    