import { initModels } from '../models/init-models.mjs'
import { dbSequelize } from '../database/config.mjs'

const models = initModels(dbSequelize)

export const validarSeguidor = async(req, res, next) => {
    try {
        
        // validar si el usuario del token quiere ver algo de si mismo
        if (req.usuarioToken.id == req.params.id || req.usuarioToken.tipoUsuario == 'administrador') return next();


        //validar si el usuario del token es seguidor del usuario del id de la url
        const info = await models.seguidores.findOne({
            where:{
                seguidor: req.usuarioToken.id,
                seguido: req.params.id
            }
        })
        
        if (!info)  return res.status(404).json({error: 'Debes seguir a este usuario para ver su perfil'});
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({error})
    }

}