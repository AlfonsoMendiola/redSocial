
import { initModels } from '../../models/init-models.mjs';
import { dbSequelize } from '../../database/config.mjs';

const { rolesUsuarios } = initModels(dbSequelize);

export const rolesUsuariosController = {
    post: async(req, res) => {
        try {
            const data = await rolesUsuarios.create({
                ...req.body,
            });
            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    get: async(req, res) => {
        try {
            const data = await rolesUsuarios.findByPk(req.params.id);
            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    gets: async(req, res) => {
        try {
            if(!req.query.page || req.query.page == '0') return res.status(400).json({error: `parametro page mayor a 0 obligatorio`})
    
            const {count:total, rows: data} = await rolesUsuarios.findAndCountAll({
                attributes:{ exclude: ['pass','tipoUsuario'] },
                limit: 5,
                offset: ( Number(req.query.page) - 1 ) * 5,
                order: [ ['id', 'DESC'] ]
            })
            res.json({ total, pages: Math.ceil( total / 5 ), data });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    update: async(req, res) => {
        try {
            // const {body} = req
            const data = await rolesUsuarios.findByPk(req.params.id);
            //tu logica
            //await data.save();
            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    
    delete: async(req, res) => {
        try {
            const data = await rolesUsuarios.destroy({
                where: {id: req.params.id}
            });
            res.json(data)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
}
    