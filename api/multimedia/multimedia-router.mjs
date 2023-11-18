import { Router } from "express";

import { check } from "express-validator";
import { validarCampos } from '../../middlewares/validar-campos.mjs'
import { validarJWT } from '../../middlewares/validar-jwt.mjs'

import { multimediaController } from "./multimedia-controller.mjs";

const multimediaRouter = Router()

multimediaRouter.get('/:nombre', [
    check('nombre', 'el nombre es obligatorio'),
    validarJWT,
    validarCampos
], multimediaController.getArchivo)

multimediaRouter.post('/', [
], multimediaController.postMultimedia)

multimediaRouter.get('/:id', [
], multimediaController.getMultimedia)

multimediaRouter.get('/', [
], multimediaController.getMultimedia)

multimediaRouter.put('/:id', [
], multimediaController.updateMultimedia)

multimediaRouter.delete('/:id', [
], multimediaController.deleteMultimedia)

export { multimediaRouter }