import { Router } from 'express';

import { usuariosController } from './usuario-controller.mjs';

import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validar-campos.mjs';
import { validarJWT } from '../../middlewares/validar-jwt.mjs';
import { validarSeguidor } from '../../middlewares/validar-seguidor.mjs';

import { emailRegistrado, existeUsuarioPorId } from '../../helpers/db-validators.mjs';
import { permisoAdministrador } from '../../middlewares/permiso-administrador.mjs';

const usuarioRouter = Router();

//endpoint publico
usuarioRouter.post('/', [
    check('displayName', 'El displayName es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('email').custom(emailRegistrado),
    check('pass', 'El pass es obligatorio').not().isEmpty(),
    validarCampos
], usuariosController.postUsuario);

usuarioRouter.get('/:id', [
    validarJWT,
    check('id').custom(existeUsuarioPorId),
    validarSeguidor,
    validarCampos
], usuariosController.getUsuario)

usuarioRouter.get('/', [
    validarJWT
], usuariosController.getUsuarios)

// no se puede cambiar username e email
usuarioRouter.put('/:id', [
    validarJWT,
    check('username', 'no se puede cambiar el username').isEmpty(),
    check('email', 'no se puede cambiar el email').isEmpty(),
    check('displayName', 'displayName obligatorio').not().isEmpty(),
    check('pass', 'no se puede cambiar la pass del usuario').isEmpty(),
    check('newPass', 'no se puede cambiar la pass del usuario').isEmpty(),
    check('id').custom(existeUsuarioPorId),
    permisoAdministrador,
    validarCampos
], usuariosController.updateUsuario)

usuarioRouter.patch('/update-pass/:id', [
    validarJWT,
    check('pass', 'no se puede cambiar la pass del usuario').not().isEmpty(),
    check('id').custom(existeUsuarioPorId),
    permisoAdministrador,
    validarCampos
], usuariosController.updatePassUsuario)

export { usuarioRouter }