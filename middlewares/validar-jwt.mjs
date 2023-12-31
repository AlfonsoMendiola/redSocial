import jwt from "jsonwebtoken";
import { initModels } from "../models/init-models.mjs";
import { dbSequelize} from "../database/config.mjs";
const { usuarios, rolesUsuarios } = initModels(dbSequelize);

export const validarJWT = async(req, res, next) => {
    try {
        if (!req.header('authorization')) return res.status(401).json({error: 'Bearer Token obligatorio'});
        const token = req.header('authorization').split(' ')[1];
        const usuarioToken = jwt.verify(token, process.env.SECRETO_PRIVATEKEY);

        const usuario = await usuarios.findByPk(usuarioToken.id);
        if(!usuario) return res.status(401).json({error: 'El usuario no existe'});
        req.usuarioToken = usuario;

        req.rolesDelUsuario = await rolesUsuarios.findAll({
            where: {id_usuario: usuarioToken.id},
            include: {all: true}
        });
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({error, msg: 'no se valido el token'});
    }
}