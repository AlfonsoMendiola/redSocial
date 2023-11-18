import { initModels } from '../models/init-models.mjs'
import { dbSequelize } from '../database/config.mjs'

const models = initModels(dbSequelize)

export const permisoAdministrador = async(req, res, next) => {
    try {
        if (req.usuarioToken.id != req.params.id && req.usuarioToken.tipoUsuario == 'usuario') return res.status(403).json({error: 'no permitido'});
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({error})
    }

}