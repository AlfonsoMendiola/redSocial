
import { initModels } from '../../models/init-models.mjs';
import { dbSequelize } from '../../database/config.mjs';

const { roles } = initModels(dbSequelize);

export const rolesController = {
    post: async(req, res) => {
        try {
            const data = await roles.create({
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
            const data = await roles.findByPk(req.params.id);
            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    gets: async(req, res) => {
        try {
            if(!req.query.page || req.query.page == '0') return res.status(400).json({error: `parametro page mayor a 0 obligatorio`})
    
            const {count:total, rows: data} = await roles.findAndCountAll({
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
            const data = await roles.findByPk(req.params.id);
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
            const data = await roles.destroy({
                where: {id: req.params.id}
            });
            res.json(data)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
}
    