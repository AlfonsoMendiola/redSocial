import bcrypt from 'bcrypt'

import { generarJWT } from '../../helpers/generar-jwt.mjs'
import { initModels } from '../../models/init-models.mjs'
import { dbSequelize } from '../../database/config.mjs'

const { usuarios: Usuarios } = initModels(dbSequelize);

export const authController = {
    login: async(req, res) => {
        try {
            const {email, pass} = req.body;
            const usuario = await Usuarios.findOne( { where:{email} } );
            if (!usuario) return res.status(404).json({error: 'Usuario del token no encontrado'});

            const validPass = bcrypt.compareSync(pass, usuario.pass);
            if(!validPass) return res.status(400).json({error: 'Pass invalida'});

            const token = await generarJWT(usuario.id);

            res.json({usuario, token});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: `${error}`});
        }
    },

    renovarToken: async(req, res) => {
        try {
            const { usuario } = req;
            const token = await generarJWT(usuario.id);

            res.json({token, usuario});
        } catch (error) {
            console.log(error);
        }
    }
}