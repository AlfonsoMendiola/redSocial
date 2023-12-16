
import { Router } from 'express';

import { seguidoresController } from './seguidores-controller.mjs';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validar-campos.mjs';
import { validarJWT } from '../../middlewares/validar-jwt.mjs';

const seguidoresRouter = Router();

seguidoresRouter.post('/', [
    validarJWT,
    //check('campo', 'El campo es obligatorio').not().isEmpty(),
    validarCampos
], seguidoresController.post);

seguidoresRouter.get('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], seguidoresController.get)

seguidoresRouter.get('/', [
    validarJWT
], seguidoresController.gets)

seguidoresRouter.put('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], seguidoresController.update)

seguidoresRouter.delete('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], seguidoresController.delete)

export { seguidoresRouter }
    