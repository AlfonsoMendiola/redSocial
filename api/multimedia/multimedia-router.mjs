
import { Router } from 'express';

import { multimediaController } from './multimedia-controller.mjs';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validar-campos.mjs';
import { validarJWT } from '../../middlewares/validar-jwt.mjs';

const multimediaRouter = Router();

multimediaRouter.post('/', [
    validarJWT,
    //check('campo', 'El campo es obligatorio').not().isEmpty(),
    validarCampos
], multimediaController.post);

multimediaRouter.get('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], multimediaController.get)

multimediaRouter.get('/', [
    validarJWT
], multimediaController.gets)

multimediaRouter.put('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], multimediaController.update)

multimediaRouter.delete('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], multimediaController.delete)

export { multimediaRouter }
    