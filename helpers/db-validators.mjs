import { initModels } from "../models/init-models.mjs";
import { dbSequelize } from "../database/config.mjs";

const { usuarios: Usuarios } = initModels(dbSequelize);

const existeUsuarioPorId = async(id) => {
    const usuario = await Usuarios.findByPk(id);
    if( !usuario ) throw new Error('El usuario no existe');
    
}

const emailRegistrado= async(email) => {
    const usuario = await Usuarios.findOne({where:{email}});
    if(usuario) throw new Error ('correo registrado');
}

export {
    existeUsuarioPorId,
    emailRegistrado
}