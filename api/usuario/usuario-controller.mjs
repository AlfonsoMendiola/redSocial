import bcrypt from 'bcrypt'
import { initModels } from '../../models/init-models.mjs'
import { dbSequelize } from '../../database/config.mjs'
import { subirArchivo } from '../../helpers/subir-archivo.mjs'

const { usuarios: Usuarios } = initModels(dbSequelize);


export const usuariosController = {
    postUsuario: async(req, res) => {
        try {
            
            const usuario = await Usuarios.create({
                ...req.body, 
                username: req.body.email,
                pass: bcrypt.hashSync(req.body.pass, bcrypt.genSaltSync()),
                imgPerfil: null
            })
            
            if(req.files){
                const imagen = await subirArchivo(req.files.imgPerfil, usuario.id)
                usuario.imgPerfil = `${process.env.DOMAIN}multimedia/${imagen}`
                await usuario.save()
            }
            
            const data = await Usuarios.findByPk(usuario.id, { attributes: { exclude:['pass', 'tipoUsuario'] } })

            res.json(data)
        } catch (error) {
            console.log(error);
            return res.status(400).json({error})
        }
    },
    getUsuario: async(req, res) => {
        try {
            const data = await Usuarios.findByPk(req.params.id, { attributes: { exclude:['pass','tipoUsuario'] } })
            res.json( data )
            
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: `${error}`})
        }
    },

    getUsuarios: async(req, res) => {
        try {
            if(!req.query.page || req.query.page == '0') return res.status(400).json({error: `parametro page mayor a 0 obligatorio`})

            const {count:total, rows: data} = await Usuarios.findAndCountAll({
                attributes:{ exclude: ['pass','tipoUsuario'] },
                limit: 5,
                offset: ( Number(req.query.page) - 1 ) * 5,
                order: [ ['id', 'DESC'] ]
            })
            res.json({ total, pages: Math.ceil( total / 5 ), data });
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: `${error}`});
        }
    },

    updateUsuario: async(req, res) => {
        //validar si actualizo mi misma cuenta o la de alguien mas
        try {
            const info = {
                ...req.body
            }
            const atributo = (req.usuarioToken.tipoUsuario == 'administrador') ? '' : 'tipoUsuario';
            
            //const usuario = await Usuarios.findByPk(req.params.id, { attributes: { exclude:['pass',`${atributo}`] } });
            const usuario = await Usuarios.findByPk(req.params.id);
            
            //si es administrador, puede cambiar tipoUsuario
            if(req.usuarioToken.tipoUsuario == 'administrador' && req.body.tipoUsuario != null){
                usuario.tipoUsuario = req.body.tipoUsuario
            }
            if(req.body.displayName) usuario.displayName = req.body.displayName;
            

            if(req.files?.imgPerfil){
                const imagen = await subirArchivo(req.files.imgPerfil, usuario.id);
                usuario.imgPerfil = `${process.env.DOMAIN}multimedia/${imagen}`;
            }

            if(req.files?.imgPortada){
                const imagen = await subirArchivo(req.files.imgPortada, usuario.id);
                usuario.imgPortada = `${process.env.DOMAIN}multimedia/${imagen}`;
            }

            await usuario.save();

            res.json(usuario);
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: `${error}`});
        }
    },
    updatePassUsuario: async(req, res) => {
        try {
            const usuario = await Usuarios.findByPk(req.params.id);
            
            //proceso de encriptacion de pass
            //si es administrador cambiar pass
            if(req.body.newPass && req.usuarioToken.tipoUsuario == 'administrador') usuario.pass = bcrypt.hashSync(req.body.newPass, bcrypt.genSaltSync());

            // si es usuario, requerir pass antigua, validar contraseña correcta
            if(req.usuarioToken.tipoUsuario == 'usuario'){
                if( req.body.pass && !req.body.newPass) return res.status(400).json({error: `se requiere contraseña actual y nueva`});

                const validPass = bcrypt.compareSync(req.body.pass, usuario.pass);
                if(!validPass) return res.status(400).json({error: 'Pass invalida'});
                usuario.pass = bcrypt.hashSync(req.body.newPass, bcrypt.genSaltSync());
            }
            res.json('todo bien')
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: `${error}`});
        }
    },
    deleteUsuario: async(req, res) => {
        try {
            res.json('todo bien')
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: `${error}`});
        }
    },
}