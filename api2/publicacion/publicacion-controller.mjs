// import { initModels } from "../models/init-models.mjs";
// import { dbSequelize } from "../database/config.mjs";

// const { usuarios: Usuarios } = initModels(dbSequelize);

export const publicacionesController = {
    postPublicacion: async(req, res) => {
        try {
            res.json('Todo bien');
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
    getPublicacion: async(req, res) => {
        try {
            res.json('Todo bien');
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
    getPublicaciones: async(req, res) => {
        try {
            res.json('Todo bien');
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
    updatePublicacion: async(req, res) => {
        try {
            res.json('Todo bien');
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
    deletePublicacion: async(req, res) => {
        try {
            res.json('Todo bien');
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
}